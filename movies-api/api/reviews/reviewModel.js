import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    movieId: { type: Number, required: true },
    content: { type: String, required: true },
    rating: { type: Number, min: 0, max: 10, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);