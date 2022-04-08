import mongoose from "mongoose";
const { Schema } = mongoose;

const url = new Schema(
  {
    original_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("urls", url);
