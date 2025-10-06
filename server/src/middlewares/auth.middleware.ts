import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !(authHeader as string).startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    token = (authHeader as string).split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No Token authorization" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decode;
        console.log("The decoded user is: ", req.user);
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid" });
    }
}

export default verifyToken