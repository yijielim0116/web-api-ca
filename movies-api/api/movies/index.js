import express from "express";
import asyncHandler from "express-async-handler";

import {getMovies,getMovie,getUpcomingMovies,getGenres,getMovieImages,getMovieCredits,getMovieRecommendations,
    getSimilarMovies,getTopRatedMovies,getPopularMovies,getNowPlayingMovies,getTrendingMovies,searchMovies,
    getPersonDetails,getPersonCombinedCredits,getCollectionDetails} from "../tmdb-api.js";

const router = express.Router();

router.get("/discover", asyncHandler(async (req, res) => {
  const data = await getMovies();
  res.status(200).json(data);
}));

// movie routes to be added
router.get("/upcoming", asyncHandler(async (req, res) => {
  const data = await getUpcomingMovies();
  res.status(200).json(data);
}));

router.get("/genres", asyncHandler(async (req, res) => {
  const data = await getGenres();
  res.status(200).json(data);
}));

router.get("/topRated", asyncHandler(async (req, res) => {
  const data = await getTopRatedMovies();
  res.status(200).json(data);
}));

router.get("/popular", asyncHandler(async (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const data = await getPopularMovies(page);
  res.status(200).json(data);
}));

router.get("/nowPlaying", asyncHandler(async (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const data = await getNowPlayingMovies(page);
  res.status(200).json(data);
}));

router.get("/trending", asyncHandler(async (req, res) => {
  const data = await getTrendingMovies();
  res.status(200).json(data);
}));

router.get("/search", asyncHandler(async (req, res) => {
  const q = req.query.q || "";
  const page = req.query.page ? Number(req.query.page) : 1;
  const data = await searchMovies(q, page);
  res.status(200).json(data);
}));

router.get("/person/:id/combined_credits", asyncHandler(async (req, res) => {
  const data = await getPersonCombinedCredits(req.params.id);
  res.status(200).json(data);
}));

router.get("/person/:id", asyncHandler(async (req, res) => {
  const data = await getPersonDetails(req.params.id);
  res.status(200).json(data);
}));

router.get("/collection/:id", asyncHandler(async (req, res) => {
  const data = await getCollectionDetails(req.params.id);
  res.status(200).json(data);
}));

router.get("/:id/images", asyncHandler(async (req, res) => {
  const data = await getMovieImages(req.params.id);
  res.status(200).json(data);
}));

router.get("/:id/credits", asyncHandler(async (req, res) => {
  const data = await getMovieCredits(req.params.id);
  res.status(200).json(data);
}));

router.get("/:id/recommendations", asyncHandler(async (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const data = await getMovieRecommendations(req.params.id, page);
  res.status(200).json(data);
}));

router.get("/:id/similar", asyncHandler(async (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const data = await getSimilarMovies(req.params.id, page);
  res.status(200).json(data);
}));

router.get("/:id", asyncHandler(async (req, res) => {
  const data = await getMovie(req.params.id);
  res.status(200).json(data);
}));

export default router;
