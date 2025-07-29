import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/db/index.js';
import cors from 'cors';

const app=express();

dotenv.config(
    {
        path:'./.env'
    }
);

app.use(cors());

app.use(express.json());

import userRouter from './src/routes/user.router.js';
app.use('/home',userRouter);

userRouter.use('/login/dashboard',express.static('./public/images'));

connectDB().then((result) => {
    app.listen(process.env.PORT||8000,()=>{
    console.log(`Server is runing at http://localhost:${process.env.PORT}`);
})
}).catch((err) => {
    console.log("Mongodb connection failed");
    
});
