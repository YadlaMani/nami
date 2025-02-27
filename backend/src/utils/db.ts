import mongoose from "mongoose";
export async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!).then(() => {
      console.log("Connected to MongoDB");
    });
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
  }
}
