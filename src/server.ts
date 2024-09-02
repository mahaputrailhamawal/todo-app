import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/user.route';
import { todoRouter } from './routes/todo.route';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';


dotenv.config();

mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("Mongodb connection success"))
    .catch((error)=> {
        console.log("Mongodb connection failed")
        console.log(error);
    });

const app = express();
app.use(cookieParser());

app.use(express.json());

app.use("/todoapp/api/v1/", userRouter);
app.use("/todoapp/api/v1/todo", todoRouter);

app.listen(process.env.PORT, () => {
   console.log(`Server is running on port ${process.env.PORT}`); 
});
