import { Request, Response } from "express";
import EspReading from "../models/espReading.model";

const DEFAULT_ESP_ID = "ESP 001";

const parseTimestamp = (value: unknown): Date | null => {
    if (value === undefined || value === null) {
        return new Date();
    }

    const parsed = new Date(value as string | number);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export class EspReadingController {
    createReading = async (req: Request, res: Response) => {
        try {
            const { timestamp, espId, battery } = req.body as {
                timestamp?: string | number;
                espId?: string;
                battery?: unknown;
            };

            if (battery === undefined || battery === null) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid payload. "battery" is required and must be an integer.',
                });
            }

            const batteryValue = Number(battery);
            if (!Number.isInteger(batteryValue)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid payload. "battery" must be an integer.',
                });
            }

            const parsedTimestamp = parseTimestamp(timestamp);
            if (!parsedTimestamp) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid payload. "timestamp" must be a valid date or ISO string.',
                });
            }

            const savedReading = await EspReading.create({
                timestamp: parsedTimestamp,
                espId: espId?.trim() || DEFAULT_ESP_ID,
                battery: batteryValue,
            });

            return res.status(201).json({
                success: true,
                message: "ESP reading saved successfully.",
                data: savedReading,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Failed to save ESP reading.",
                error,
            });
        }
    };

    listReadings = async (req: Request, res: Response) => {
        try {
            const { espId } = req.query;
            const filter =
                typeof espId === "string" && espId.trim()
                    ? { espId: espId.trim() }
                    : {};

            const readings = await EspReading.find(filter).sort({ timestamp: -1 });

            return res.status(200).json({
                success: true,
                data: readings,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch ESP readings.",
                error,
            });
        }
    };
}
