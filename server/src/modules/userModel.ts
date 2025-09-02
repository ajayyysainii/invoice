import mongoose from "mongoose"

const userSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String},
        gender:{type: String, enum: ['Male', 'Female', 'Other', 'Not Selected'], default: 'Not Selected',required: true},
        googleId: { type: String, unique: true, sparse: true },
    },{timestamps:true}
)

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;