import express from "express";
import asyncHandler from "express-async-handler";
import Review from "./reviewModel.js";
import authenticate from "../../authenticate/index.js";

const router = express.Router();

router.get("/", authenticate, asyncHandler(async (req, res) => {
  const reviews = await Review.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(reviews);
}));

router.get("/movie/:movieId", authenticate, asyncHandler(async (req, res) => {
  const movieId = Number(req.params.movieId);
  const reviews = await Review.find({ userId: req.user._id, movieId }).sort({ createdAt: -1 });
  res.status(200).json(reviews);
}));

router.post("/", authenticate, asyncHandler(async (req, res) => {
  const { movieId, content, rating } = req.body;

  const review = await Review.create({
    movieId: Number(movieId),
    content,
    rating: Number(rating),
    userId: req.user._id,
  });

  res.status(201).json(review);
}));

router.delete("/:id", authenticate, asyncHandler(async (req, res) => {
  await Review.deleteOne({ _id: req.params.id, userId: req.user._id });
  res.status(204).end();
}));

router.get("/ping", (req, res) => res.status(200).json({ ok: true }));

export default router;