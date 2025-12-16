import express from "express";
import asyncHandler from "express-async-handler";
import Watchlist from "./watchlistModel.js";
import authenticate from "../../authenticate/index.js";

const router = express.Router();

router.get("/",authenticate, asyncHandler(async (req, res) => {
    const list = await Watchlist.find({ userId: req.user._id });
    res.status(200).json(list);
  })
);

router.post("/", authenticate,asyncHandler(async (req, res) => {
    const item = await Watchlist.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json(item);
  })
);

router.delete("/:movieId",authenticate,asyncHandler(async (req, res) => {
    await Watchlist.deleteOne({
      userId: req.user._id,
      movieId: Number(req.params.movieId),
    });
    res.status(204).end();
  })
);

export default router;