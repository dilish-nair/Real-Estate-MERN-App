import express, { Router } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './Routes/user.route.js';
import authRouter from './Routes/auth.route.js';






dotenv.config();

console.log('Starting server...');
// console.log('MONGO URI:', process.env.MONGO);

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

// Routes
app.use('/api/user', router);
app.use('/api/auth', authRouter);

// Global error handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log('Server setup complete.');