import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error in connecting to MongoDB:", error.message);
    process.exit(1); // Exit process if MongoDB connection fails
  }
};

export default connectDB;
