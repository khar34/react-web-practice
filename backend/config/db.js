import mongoose from 'mongoose';

// Connect to MongoDB
export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (connection) {
      console.log('MongoDB connected: ${connection.connection.host}');
    }
  } catch (error) {
    console.error('Error: ${error.message}');
    process.exit(1); // 1 = failure, 0 = sucesss
  }
}
