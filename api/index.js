import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './Routes/user.route.js';
import authRouter from './Routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

console.log('Starting server...');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', router);
app.use('/api/auth', authRouter);

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log('Server setup complete.');
