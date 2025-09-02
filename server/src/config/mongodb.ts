import mongoose from "mongoose";
const connectDB=async () => {
    try {
        mongoose.connection.on('connected',()=>console.log("DATABASE CONNECTED"))
        await mongoose.connect(`${process.env.MONGODB_URI}/thapar-project`) 
    } catch (error) {
        console.log("Error in connecting Database ",error)
    }  
}

export default connectDB