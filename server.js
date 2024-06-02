import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
import * as bodyParser from "express";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import FeedbackRoutes from "./routes/feedbackRoutes.js";


dotenv.config()

const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
    origin: 'https://www.spexafrica.app',
    credentials :true

}));
app.use(cookieParser());











app.use('/api' , authRoutes)
 app.use('/api' ,FeedbackRoutes)



mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(process.env.PORT ,()=> console.log(`Server connected to the database and running on port ${process.env.PORT}`)))
    .catch((err) => console.log(`error : ${err.message}`))