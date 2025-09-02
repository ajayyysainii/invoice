import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const authUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { token } = req.headers;
      
      if (!token) {
        return res.json({ success: false, message: "Not Authorized. Login Again" });
      }

      const tokenStr = Array.isArray(token) ? token[0] : token;
      const token_decode = jwt.verify(tokenStr, process.env.JWT_SECRET as string) as { id: string };
      req.userId = token_decode.id;
  
      next();
  
    } catch (error:any) {
      console.log("Error in Auth User middleware ", error);
  
      // Check if token expired
      if (error.name === "TokenExpiredError") {
        return res.json({ success: false, message: "jwt expired" });
      }
  
      res.json({ success: false, message: error.message });
    }
  };
  
  export default authUser;
  