import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return; // Already connected
    }
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://adityadharhipl_db_user:wj6E4z0vUpeR60Ir@cluster0.lvolpp6.mongodb.net/ChatBot?appName=Cluster0');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // Don't call process.exit() in serverless - it kills the function
  }
};

export default connectDB;
