import mongoose, { Schema } from "mongoose";

export interface IJsonPayload3 {
    data: unknown;
}

const jsonPayload3Schema = new Schema<IJsonPayload3>({
    data: {
        type: Schema.Types.Mixed,
        required: true,
    },
}, {
    timestamps: true,
});

const JsonPayload3 =
    mongoose.models.JsonPayload3 ||
    mongoose.model<IJsonPayload3>("JsonPayload3", jsonPayload3Schema);

export default JsonPayload3;

