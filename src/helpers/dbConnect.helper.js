import { connect } from 'mongoose';

const dbConnect = async (url) => {
    try {
        await connect(url);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
    }
}

export default dbConnect;