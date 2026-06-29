import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return; // Already connected
    }
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai_chat_app');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // Don't call process.exit() in serverless - it kills the function
  }
};

export default connectDB;
