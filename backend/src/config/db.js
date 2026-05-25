import mongoose from 'mongoose';
import { env } from './env.js';

const connectDB = async () => {
    try {
        if (!env.MONGO_URI) {
            console.error("Error: MONGO_URI is not defined in the environment variables.");
            process.exit(1);
        }
        
        const conn = await mongoose.connect(env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
