import mongoose, { Schema } from "mongoose";

export interface IJsonPayload2 {
    data: unknown;
}

const jsonPayload2Schema = new Schema<IJsonPayload2>({
    data: {
        type: Schema.Types.Mixed,
        required: true,
    },
}, {
    timestamps: true,
});

const JsonPayload2 =
    mongoose.models.JsonPayload2 ||
    mongoose.model<IJsonPayload2>("JsonPayload2", jsonPayload2Schema);

export default JsonPayload2;

