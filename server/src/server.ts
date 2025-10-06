import express, { Request, Response } from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb"
import MODULE_ROUTE_MAPPING from "./app";
import { server } from "typescript";
import morgan from 'morgan'



const app = express();
const port=process.env.PORT || 4000

connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.use(cors(
    {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }
)) 




app.get("/",(req:Request,res: Response)=>{
    res.send("Invoice Backend !!")
});

MODULE_ROUTE_MAPPING.forEach(({prefix,router})=>{
    app.use(prefix,router);
})


app.listen(port, () => {
    console.log(`Server is Running! at Port ${port}`);
});



