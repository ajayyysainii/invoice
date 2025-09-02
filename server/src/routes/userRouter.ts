import express from "express"
import { allInformations, googleAuth, googleAuthCallback, loginUser, registerUser, validate } from "../controllers/userController"
import authUser from "../middlewares/authUser"
import passport from "passport"
// import  jwt from "jsonwebtoken"

const userRouter=express.Router()



userRouter.get("/auth/google",passport.authenticate("google", { scope: ["profile", "email"] }),googleAuth);
userRouter.get("/auth/google/callback",passport.authenticate("google", { failureRedirect: "/login" }),googleAuthCallback);
userRouter.post('/auth/register',registerUser)
userRouter.post('/auth/login',loginUser)
userRouter.get('/auth/validate',authUser,validate)
userRouter.get('/info/all-users',allInformations)


export default userRouter