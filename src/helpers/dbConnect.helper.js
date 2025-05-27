import logger from './logger.helper.js';
import { connect } from 'mongoose';

const dbConnect = async (url) => {
    try {
        await connect(url);
        logger.INFO('MongoDB connected');
    } catch (error) {
        logger.ERROR(`MongoDB connection error: ${error.message}`);
    }
}

export default dbConnect;