import dotenv from "dotenv";
dotenv.config();

import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

async function main() {
  try {
    const mongoUri = process.env.MONGO_URI;
    const port = process.env.PORT || 5000;

    if (!mongoUri) throw new Error("❌ MONGO_URI is not defined in .env");

    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB using Mongoose");

    server = app.listen(port, () => {
      console.log(`🚀 Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
}

main();
