import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.MONGODB_URI;

const dbConnection = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
        });
    } catch (error) {
    }
}

export default { dbConnection, MONGO_URI }