import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies } from '../tmdb-api';

import Favourite from './favouriteModel.js';
import Watchlist from './watchlistModel.js';
import { authenticate } from '../authenticate/index.js';

const router = express.Router();

// movie routes to be added
router.get('/favourites', authenticate, asyncHandler(async (req, res) => {
  const favs = await Favourite.find({ userId: req.user._id });
  res.status(200).json(favs);
}));

router.post('/favourites', authenticate, asyncHandler(async (req, res) => {
  const fav = await Favourite.create({
    ...req.body,
    userId: req.user._id,
  });
  res.status(201).json(fav);
}));

router.delete('/favourites/:movieId', authenticate, asyncHandler(async (req, res) => {
  await Favourite.deleteOne({
    userId: req.user._id,
    movieId: Number(req.params.movieId),
  });
  res.status(204).end();
}));

router.get('/watchlist', authenticate, asyncHandler(async (req, res) => {
  const list = await Watchlist.find({ userId: req.user._id });
  res.status(200).json(list);
}));

router.post('/watchlist', authenticate, asyncHandler(async (req, res) => {
  const item = await Watchlist.create({
    ...req.body,
    userId: req.user._id,
  });
  res.status(201).json(item);
}));

router.delete('/watchlist/:movieId', authenticate, asyncHandler(async (req, res) => {
  await Watchlist.deleteOne({
    userId: req.user._id,
    movieId: Number(req.params.movieId),
  });
  res.status(204).end();
}));


router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));


export default router;
