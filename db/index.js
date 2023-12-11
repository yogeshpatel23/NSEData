import mongoose from "mongoose";
import { logging } from "../logging.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/nsedata");
    console.log(`\n MongoDB connect !! DB : ${conn.connection.host}`);
  } catch (error) {
    logging(`DB Connetin error :: ${error}`);
  }
};

export { connectDB };
