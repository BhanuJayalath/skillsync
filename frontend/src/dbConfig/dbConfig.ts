import mongoose from "mongoose";

export async function connect() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI environment variable is not set.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      // Optional: add any connection options if needed
      // For Mongoose 6+, most options are set by default
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB. Please make sure MongoDB is running.", error);
    process.exit(1);
  }
}