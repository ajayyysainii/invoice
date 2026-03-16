import express, { Request, Response } from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb"
import MODULE_ROUTE_MAPPING from "./app";
import { server } from "typescript";
import morgan from 'morgan'
import mongoose, { Schema } from "mongoose";
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

        return res.status(201).json({
            success: true,
            message: "JSON saved to MongoDB successfully.",
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



