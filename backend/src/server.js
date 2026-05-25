import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './config/db.js';

// Connect to MongoDB
connectDB();

// Using port 3000 as requested
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server is successfully running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
