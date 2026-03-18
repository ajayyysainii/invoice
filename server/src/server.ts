import express, { Request, Response } from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb"
import MODULE_ROUTE_MAPPING from "./app";
import { server } from "typescript";
import morgan from 'morgan'
import mongoose, { Schema } from "mongoose";
import { google } from "googleapis";
import JsonPayload2 from "./models/jsonPayload2.model";
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    ListObjectsV2Command,
} from "@aws-sdk/client-s3";



const app = express();
const port = process.env.PORT || 4000

connectDB();

interface IJsonPayload {
    data: Record<string, unknown>;
}

const jsonPayloadSchema = new Schema<IJsonPayload>({
    data: {
        type: Schema.Types.Mixed,
        required: true
    }
}, {
    timestamps: true
});

const JsonPayload = mongoose.models.JsonPayload || mongoose.model<IJsonPayload>("JsonPayload", jsonPayloadSchema);

const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SHEET_NAME = process.env.GOOGLE_SHEET_NAME || "Sheet1";
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

const columnToA1 = (col: number) => {
    let n = col;
    let s = "";
    while (n > 0) {
        const r = (n - 1) % 26;
        s = String.fromCharCode(65 + r) + s;
        n = Math.floor((n - 1) / 26);
    }
    return s;
}

const formatSheetTimeIST = (date: Date) => {
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).formatToParts(date);

    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
    // en-GB gives DD/MM/YYYY, we convert to DD-MM-YYYY HH:mm:ss
    return `${get("day")}-${get("month")}-${get("year")} ${get("hour")}:${get("minute")}:${get("second")}`;
}

type SensorReading = {
    voltage?: unknown;
    current?: unknown;
    power?: unknown;
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
    typeof v === "object" && v !== null && !Array.isArray(v);

const appendJsonToGoogleSheet = async (payload: Record<string, unknown>) => {
    if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        throw new Error("Missing Google Sheets configuration in environment variables.");
    }

    const auth = new google.auth.JWT({
        email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    const sheets = google.sheets({ version: "v4", auth });

    const inputTime = typeof payload.time === "string" ? new Date(payload.time) : new Date();
    const isValidTime = !Number.isNaN(inputTime.getTime());
    const timeValue = formatSheetTimeIST(isValidTime ? inputTime : new Date());

    const sensors: Record<string, SensorReading> = {};
    Object.entries(payload).forEach(([key, value]) => {
        if (key === "time") return;
        if (!isPlainObject(value)) return;
        sensors[key] = {
            voltage: (value as Record<string, unknown>).voltage,
            current: (value as Record<string, unknown>).current,
            power: (value as Record<string, unknown>).power,
        };
    });

    const metricKeys = ["voltage", "current", "power"] as const;
    const sensorKeys = Object.keys(sensors).sort();
    const desiredHeader = ["time", ...sensorKeys.flatMap((s) => metricKeys.map((m) => `${s}_${m}`))];

    const headerResp = await sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${GOOGLE_SHEET_NAME}!1:1`,
    });

    const existingHeader = (headerResp.data.values?.[0] as string[] | undefined) ?? [];
    const headerSet = new Set(existingHeader.filter(Boolean));
    const missing = desiredHeader.filter((h) => !headerSet.has(h));
    const finalHeader = existingHeader.length ? [...existingHeader, ...missing] : desiredHeader;

    if (finalHeader.length !== existingHeader.length) {
        const lastCol = columnToA1(finalHeader.length);
        await sheets.spreadsheets.values.update({
            spreadsheetId: GOOGLE_SHEET_ID,
            range: `${GOOGLE_SHEET_NAME}!A1:${lastCol}1`,
            valueInputOption: "RAW",
            requestBody: { values: [finalHeader] }
        });
    }

    const rowByHeader = new Map<string, unknown>();
    rowByHeader.set("time", timeValue);
    sensorKeys.forEach((s) => {
        const r = sensors[s] || {};
        rowByHeader.set(`${s}_voltage`, r.voltage ?? "");
        rowByHeader.set(`${s}_current`, r.current ?? "");
        rowByHeader.set(`${s}_power`, r.power ?? "");
    });

    const row = finalHeader.map((h) => rowByHeader.get(h) ?? "");
    const lastCol = columnToA1(finalHeader.length);

    await sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${GOOGLE_SHEET_NAME}!A:${lastCol}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [row] }
    });
}

// Accept JSON bodies, but tolerate common non-JSON tokens from sensors (inf/Infinity/NaN)
app.use(express.text({ type: ["application/json", "application/*+json"], limit: "1mb" }))
app.use((req, _res, next) => {
    if (typeof req.body === "string" && (req.is("application/json") || req.is("application/*+json"))) {
        const raw = req.body;
        const sanitized = raw.replace(/\b(inf|Infinity|NaN)\b/g, "null");
        try {
            req.body = JSON.parse(sanitized);
        } catch (e) {
            return next(e);
        }
    }
    next();
})
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.use(cors(
    {
        origin: "*",
        credentials: true,
    }
))

// Clean 400 response for invalid JSON bodies
app.use((err: unknown, _req: Request, res: Response, next: (err?: unknown) => void) => {
    if (err instanceof SyntaxError) {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON body. If your sensor sends Infinity/inf/NaN, send it as null or string."
        });
    }
    next(err);
})



const s3 = new S3Client({
    region: "auto",
    endpoint: "https://956854b83476ec7aadcc4cba36d15db1.r2.cloudflarestorage.com/invoice",
    credentials: {
        accessKeyId: "90fb93e2dca285a135c621b4f3f274b1",
        secretAccessKey: "0ae5e84442280960c3a37bc7dc696f80fbaaa1d56903ec61c4e5e2316c94f5cd",
    },
});




app.get("/", (req: Request, res: Response) => {
    res.send("Invoice Backend !!")
});

MODULE_ROUTE_MAPPING.forEach(({ prefix, router }) => {
    app.use(prefix, router);
})


app.post("/test", async (req: Request, res: Response) => {
    try {

        await s3.send(new PutObjectCommand({
            Bucket: "invoice",
            Key: "myfile.txt",
            Body: "Hello, R2!",
        }));
        console.log("Uploaded myfile.txt");
        res.json({ success: true, message: "File uploaded to R2" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "File not uploaded to R2",error:error });
    }
})

app.post("/save-json", async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
            return res.status(400).json({
                success: false,
                message: "Invalid JSON payload. Expected a JSON object."
            });
        }

        const savedData = await JsonPayload.create({ data: payload });
        let sheetSaved = false;
        let sheetMessage = "Saved in Google Sheet.";

        try {
            await appendJsonToGoogleSheet(payload);
            sheetSaved = true;
        } catch (sheetError) {
            const errorWithMeta = sheetError as {
                code?: number;
                response?: { data?: { error?: { message?: string } } };
                message?: string;
            };

            console.log("Google Sheet save error:", errorWithMeta);

            if (errorWithMeta.code === 403) {
                sheetMessage = "MongoDB save succeeded, but Google Sheet permission denied. Share the sheet with your service-account email as Editor.";
            } else {
                sheetMessage = errorWithMeta.response?.data?.error?.message || errorWithMeta.message || "MongoDB save succeeded, but failed to save in Google Sheet.";
            }
        }

        return res.status(201).json({
            success: true,
            message: sheetSaved
                ? "JSON saved to MongoDB and Google Sheet successfully."
                : "JSON saved to MongoDB, but Google Sheet save failed.",
            sheetStatus: {
                saved: sheetSaved,
                message: sheetMessage
            },
            data: savedData
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to save JSON payload.",
            error
        });
    }
})





app.post("/save-json-2", async (req: Request, res: Response) => {
    try {
        const payload = req.body as unknown;

        if (!isPlainObject(payload)) {
            return res.status(400).json({
                success: false,
                message: "Invalid payload. Expected a JSON object.",
            });
        }

        const obj = payload as Record<string, unknown>;
        const hasVcp = "voltage" in obj && "current" in obj && "power" in obj;

        if (!hasVcp) {
            return res.status(400).json({
                success: false,
                message: "Invalid payload. Expected: { \"voltage\": ..., \"current\": ..., \"power\": ... }",
            });
        }

        const shaped = {
            voltage: obj.voltage,
            current: obj.current,
            power: obj.power,
        };

        const savedDoc = await JsonPayload2.create({ data: shaped });

        return res.status(201).json({
            success: true,
            message: "JSON saved to MongoDB successfully (save-json-2).",
            data: savedDoc,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to save JSON payload (save-json-2).",
            error,
        });
    }
})

app.listen(port, () => {
    console.log(`Server is Running! at Port ${port}`);
});



