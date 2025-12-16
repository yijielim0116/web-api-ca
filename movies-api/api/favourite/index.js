import express from "express";
import asyncHandler from "express-async-handler";
import Favourite from "./favouriteModel.js";
import authenticate from "../../authenticate/index.js";

const router = express.Router();

router.get( "/",authenticate, asyncHandler(async (req, res) => {
    const favs = await Favourite.find({ userId: req.user._id });
    res.status(200).json(favs);
  })
);

router.post( "/",authenticate,asyncHandler(async (req, res) => {
    const fav = await Favourite.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json(fav);
  })
);

router.delete("/:movieId",authenticate, asyncHandler(async (req, res) => {
    await Favourite.deleteOne({
      userId: req.user._id,
      movieId: Number(req.params.movieId),
    });
    res.status(204).end();
  })
);

export default router;