import mongoose, { Schema } from "mongoose";

export interface IEspReading {
    timestamp: Date;
    espId: string;
    battery: number;
}

const espReadingSchema = new Schema<IEspReading>(
    {
        timestamp: {
            type: Date,
            required: true,
        },
        espId: {
            type: String,
            required: true,
            default: "ESP 001",
        },
        battery: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const EspReading =
    mongoose.models.EspReading ||
    mongoose.model<IEspReading>("EspReading", espReadingSchema);

export default EspReading;
