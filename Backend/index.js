import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/db/index.js';

const app=express();

dotenv.config(
    {
        path:'./.env'
    }
);

connectDB().then((result) => {
    app.listen(process.env.PORT||8000,()=>{
    console.log(`Server is runing at http://localhost:${process.env.PORT}`);
})
}).catch((err) => {
    console.log("Mongodb connection failed");
    
});;
