import express, { Request, Response } from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb"
import userRouter from "./routes/userRouter";
import passport from "passport";
import session from "express-session";
import "./config/passport";


const app = express();
const port=process.env.PORT || 4000
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }
)) 

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
)


app.use(passport.initialize());
app.use(passport.session());


const apiCheck=async (req:Request,res:Response)=>{
    try {
        console.log("API CALL")
        const result ={
            ui:"ayush",
            frontend:"Ajay",
            backend:"Ajay",
            ml:"Vivek"
        }
        res.json({success:true,result});
    } catch (error:any) {
        console.error("Error in checking api for home page ",error)
        res.status(500).json({success:false,message:error.message});
    }
}


app.get("/",apiCheck);
app.use("/api/v1/",userRouter)


app.listen(port, () => {
    console.log("done");
});

