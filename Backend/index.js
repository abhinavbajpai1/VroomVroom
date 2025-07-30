import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/db/index.js';
import cors from 'cors';

const app = express();

dotenv.config({
    path: './.env'
});

app.use(cors());
app.use(express.json());

// Serve static files
app.use('/uploads', express.static('./public/images'));

// Import routes
import userRouter from './src/routes/user.router.js';
import authRouter from './src/routes/auth.router.js';
import bikeRouter from './src/routes/bike.router.js';
import serviceRequestRouter from './src/routes/serviceRequest.router.js';

// API routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/bikes', bikeRouter);
app.use('/api/service-requests', serviceRequestRouter);

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'VroomVroom API is running' });
});

connectDB().then((result) => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at http://localhost:${process.env.PORT || 8000}`);
    });
}).catch((err) => {
    console.log("MongoDB connection failed:", err);
});
