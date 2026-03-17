import express, { Request, Response } from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb"
import MODULE_ROUTE_MAPPING from "./app";
import { server } from "typescript";
import morgan from 'morgan'
import mongoose, { Schema } from "mongoose";
import { google } from "googleapis";
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

const formatSheetTime = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

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
    const timeValue = formatSheetTime(isValidTime ? inputTime : new Date());
    const voltageValue = payload.voltage ?? "";
    const currentValue = payload.current ?? "";
    const powerValue = payload.power ?? "";

    await sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${GOOGLE_SHEET_NAME}!A:D`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [[timeValue, voltageValue, currentValue, powerValue]]
        }
    });
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.use(cors(
    {
        origin: "*",
        credentials: true,
    }
))



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





app.listen(port, () => {
    console.log(`Server is Running! at Port ${port}`);
});



