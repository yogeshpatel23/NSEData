import { Schema, model } from "mongoose";

const strickSchema = new Schema(
  {
    strikePrice: String,
    time: String,
    PE: { OI: Number, cOI: Number },
    CE: { OI: Number, cOI: Number },
  },
  { _id: false }
);

const niftySchema = new Schema({
  date: String,
  data: [strickSchema],
});

export const Nifty = model("Nifty", niftySchema);
