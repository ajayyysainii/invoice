import mongoose, { Schema } from "mongoose";

export enum Roles{
    USER = "user",
    ADMIN = "Admin"
}


interface IUser {
    profilePictureLink: string
    gst: string
    address: string
    nameOfBusiness: string
    email: string
    password: string
    name: string
    phone: number
    role: Roles
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    nameOfBusiness: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String },
    gst: { type: String },
    profilePictureLink: { type: String },
    role: {type:String, enum: Roles, required: true}
},{
    timestamps: true,
})

const User = mongoose.model<IUser>('User', userSchema)

export default User;
