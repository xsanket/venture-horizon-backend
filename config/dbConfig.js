import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.MONGODB_URI;

const dbConnection = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
        
        });
        console.log("MongoDB connected successfully");

    } catch (error) {
        console.error(`error connecting to DB : ${error}`);
        console.log('error in db connection')
    }
}

export default { dbConnection, MONGO_URI }