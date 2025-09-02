import userModel from "../modules/userModel";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt , {SignOptions} from "jsonwebtoken";
import validator from "validator";

//For google sign function 
const options: SignOptions = {
  expiresIn: process.env.JWT_EXPIRES_IN as any
};


const googleAuth = (req: Request, res: Response, next: any) => {
  next();
};

const googleAuthCallback = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;

    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
      throw new Error("Missing JWT environment variables");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      options
    );

    res.redirect(process.env.FRONTEND_URL+`/auth/success?token=${token}`);

  } catch (error: any) {
    console.error("Error in Google Auth Callback:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const registerUser= async (req:Request,res:Response)=>{
    try {
        const {name,email,password}=req.body
        if(!name || !email || !password)
            return res.json({sucess:false,message:"All fields are required"})
        if (!validator.isEmail(email))
            return res.json({ success: false, message: "Invalid Email" });

        const existingUser=await userModel.findOne({email})
        if(existingUser)
            return res.json({ success: false, message: "User Already Exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        res.json({ success: true, message: "User created successfully" });
    } catch (error:any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const loginUser=async (req:Request,res:Response)=>{
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
        return res.json({ success: false, message: "All Fields Required" });
        }

        // check user exist or not
        const user = await userModel.findOne({ email });

        if (!user) {
        return res.json({ success: false, message: "Invalid Credentials" });
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.json({ success: false, message: "Invalid Credentials" });
        }

        // generate token
        if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
            throw new Error("Missing JWT environment variables");
        }
        const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string,
        options
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

const validate =async (req:Request,res:Response)=>{
    try {
        const userId = req.userId;
        const user=await userModel.findById(userId)
        if(!user){
            return res.json({ success: false, message: "Invalid user" });
        }
        return res.json({ success: true, message: "Valid user" });
    } catch (error:any) {
        console.log("Error in Validate User ", error);
        res.json({ success: false, message: error.message });
    }
}

const allInformations=async (req:Request,res:Response)=>{
    try {
        const users=await userModel.find({},{name:1,gender:1,_id:0});
        return res.json({success:true,message:"All information fetched",users})
    } catch (error:any) {
        console.log("Error in Validate User ", error);
        res.json({ success: false, message: error.message });
    }
}

export {registerUser,loginUser,googleAuth,googleAuthCallback,validate,allInformations}