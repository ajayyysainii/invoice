import mongoose, { mongo, Schema } from "mongoose";

interface IBuyers{
    userId: mongoose.Types.ObjectId
    profilePictureLink: string
    gst: string
    address: string
    nameOfBusiness: string
    email: string
    name: string
    phone: number
}

const buyerSchema = new Schema<IBuyers>({
    userId: {
        type:mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    nameOfBusiness: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String },
    gst: { type: String },
    profilePictureLink: { type: String },
},{
    timestamps: true,
})

const Buyers = mongoose.model<IBuyers>('Buyers',buyerSchema)

export default Buyers;