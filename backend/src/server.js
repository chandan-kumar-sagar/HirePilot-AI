import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './config/db.js';
import logger from './utils/logger.js';

// Connect to MongoDB
connectDB();


// Using port 3000 as requested
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    logger.info(`Server is successfully running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error('UNHANDLED REJECTION! Shutting down...');
    logger.error(`${err.name}: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});
