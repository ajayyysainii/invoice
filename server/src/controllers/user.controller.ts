import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt , {SignOptions} from "jsonwebtoken";
import validator from "validator";


export class UserController {

    registerUser= async (req:Request,res:Response)=>{
        try {
            const {name,email,password,gst,address,nameOfBusiness,phone}=req.body

    
            if(!name || !email || !password || !nameOfBusiness || !phone)
                return res.json({sucess:false,message:"All fields are required"})
            
            if (!validator.isEmail(email))
                return res.json({ success: false, message: "Invalid Email" });
    
            const existingUser=await User.findOne({email})
    
            if(existingUser)
                return res.json({ success: false, message: "User Already Exists" });
    
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                gst,
                address,
                nameOfBusiness,
                phone,
                role: "user"
            });
    
            res.json({ success: true, message: "User created successfully" });
        } catch (error:any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    
    loginUser=async (req:Request,res:Response)=>{
        try {
            
            const {email,password} = req.body;
            // // validation
            if (!email || !password) {
            return res.json({ success: false, message: "All Fields Required" });
            }
    
            // // check user exist or not
            const user = await User.findOne({ email });
    
            if (!user) {
            return res.json({ success: false, message: "Invalid Credentials" });
            }
    
            // // check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
            }
    
            // // generate token
            if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
                throw new Error("Missing JWT environment variables");
            }
            
            const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
            );
    
            res.json({
            success: true,
            message: "Login Successful",
            token,
            });


        } catch (error:any) {
            console.log("Error in Login User ", error);
            res.json({ success: false, message: error.message });
        }
    }
    
    

}



