import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (MONGO_URI === "" || MONGO_URI === null || MONGO_URI === undefined) {
  throw new Error("Please define the MONGO_URI environment variable inside .env");
}

export async function connectToDatabase() {
  try {
    const client = await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
    return client.startSession();
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}
