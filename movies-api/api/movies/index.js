/**
 * Movies API Router
 * ------------------
 * This router exposes movie-related endpoints.
 * It acts as a backend proxy to the TMDB API and also
 * provides user-specific features such as favourites and watchlists.
 */

import express from "express";
import asyncHandler from "express-async-handler";

// TMDB API wrapper functions
import {
  getMovies,
  getMovie,
  getUpcomingMovies,
  getGenres,
  getMovieImages,
  getMovieCredits,
  getMovieRecommendations,
  getSimilarMovies,
  getTopRatedMovies,
  getPopularMovies,
  getNowPlayingMovies,
  getTrendingMovies,
  searchMovies,
  getPersonDetails,
  getPersonCombinedCredits,
  getCollectionDetails,
} from "../tmdb-api.js";

// Mongoose models for user-specific data
import Favourite from "./favouriteModel.js";
import Watchlist from "./watchlistModel.js";

// JWT authentication middleware
import authenticate from "../../authenticate/index.js";

const router = express.Router();

/* =========================
   PUBLIC MOVIE ENDPOINTS
   ========================= */

/**
 * GET /api/movies/discover
 * Returns a list of discoverable movies for the homepage.
 */
router.get("/discover", asyncHandler(async (req, res) => {
  const data = await getMovies();
  res.status(200).json(data);
}));

/**
 * GET /api/movies/upcoming
 * Returns upcoming movie releases.
 */
router.get("/upcoming", asyncHandler(async (req, res) => {
  const data = await getUpcomingMovies();
  res.status(200).json(data);
}));

/**
 * GET /api/movies/genres
 * Returns all movie genres.
 */
router.get("/genres", asyncHandler(async (req, res) => {
  const data = await getGenres();
  res.status(200).json(data);
}));

/**
 * GET /api/movies/topRated
 * Returns top-rated movies.
 */
router.get("/topRated", asyncHandler(async (req, res) => {
  const data = await getTopRatedMovies();
  res.status(200).json(data);
}));

/**
 * GET /api/movies/popular?page=1
 * Returns popular movies with pagination support.
 */
router.get("/popular", asyncHandler(async (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const data = await getPopularMovies(page);
  res.status(200).json(data);
}));

/**
 * GET /api/movies/nowPlaying?page=1
 * Returns movies currently playing in cinemas.
 */
router.get("/nowPlaying", asyncHandler(async (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const data = await getNowPlayingMovies(page);
  res.status(200).json(data);
}));

/**
 * GET /api/movies/trending
 * Returns trending movies for the week.
 */
router.get("/trending", asyncHandler(async (req, res) => {
  const data = await getTrendingMovies();
  res.status(200).json(data);
}));

/**
 * GET /api/movies/search?q=query&page=1
 * Searches movies by title.
 */
router.get("/search", asyncHandler(async (req, res) => {
  const q = req.query.q || "";
  const page = req.query.page ? Number(req.query.page) : 1;
  const data = await searchMovies(q, page);
  res.status(200).json(data);
}));

/* =========================
   PEOPLE & COLLECTIONS
   ========================= */

/**
 * GET /api/movies/person/:id
 * Returns details for a specific person (actor/director).
 */
router.get("/person/:id", asyncHandler(async (req, res) => {
  const data = await getPersonDetails(req.params.id);
  res.status(200).json(data);
}));

/**
 * GET /api/movies/person/:id/combined_credits
 * Returns all movie and TV credits for a person.
 */
router.get("/person/:id/combined_credits", asyncHandler(async (req, res) => {
  const data = await getPersonCombinedCredits(req.params.id);
  res.status(200).json(data);
}));

/**
 * GET /api/movies/collection/:id
 * Returns details for a movie collection.
 */
router.get("/collection/:id", asyncHandler(async (req, res) => {
  const data = await getCollectionDetails(req.params.id);
  res.status(200).json(data);
}));

/* =========================
   USER-SPECIFIC ENDPOINTS
   (JWT PROTECTED)
   ========================= */

/**
 * GET /api/movies/favourites
 * Returns the logged-in user's favourite movies.
 */
router.get("/favourites", authenticate, asyncHandler(async (req, res) => {
  const favs = await Favourite.find({ userId: req.user._id });
  res.status(200).json(favs);
}));

/**
 * POST /api/movies/favourites
 * Adds a movie to the logged-in user's favourites.
 */
router.post("/favourites", authenticate, asyncHandler(async (req, res) => {
  const fav = await Favourite.create({
    ...req.body,
    userId: req.user._id,
  });
  res.status(201).json(fav);
}));

/**
 * DELETE /api/movies/favourites/:movieId
 * Removes a movie from the user's favourites.
 */
router.delete("/favourites/:movieId", authenticate, asyncHandler(async (req, res) => {
  await Favourite.deleteOne({
    userId: req.user._id,
    movieId: Number(req.params.movieId),
  });
  res.status(204).end();
}));

/**
 * GET /api/movies/watchlist
 * Returns the logged-in user's watchlist.
 */
router.get("/watchlist", authenticate, asyncHandler(async (req, res) => {
  const list = await Watchlist.find({ userId: req.user._id });
  res.status(200).json(list);
}));

/**
 * POST /api/movies/watchlist
 * Adds a movie to the user's watchlist.
 */
router.post("/watchlist", authenticate, asyncHandler(async (req, res) => {
  const item = await Watchlist.create({
    ...req.body,
    userId: req.user._id,
  });
  res.status(201).json(item);
}));

/**
 * DELETE /api/movies/watchlist/:movieId
 * Removes a movie from the user's watchlist.
 */
router.delete("/watchlist/:movieId", authenticate, asyncHandler(async (req, res) => {
  await Watchlist.deleteOne({
    userId: req.user._id,
    movieId: Number(req.params.movieId),
  });
  res.status(204).end();
}));

/* =========================
   MOVIE-SPECIFIC DETAILS
   ========================= */

/**
 * GET /api/movies/:id/images
 * Returns images for a specific movie.
 */
router.get("/:id/images", asyncHandler(async (req, res) => {
  const data = await getMovieImages(req.params.id);
  res.status(200).json(data);
}));

/**
 * GET /api/movies/:id/credits
 * Returns cast and crew for a movie.
 */
router.get("/:id/credits", asyncHandler(async (req, res) => {
  const data = await getMovieCredits(req.params.id);
  res.status(200).json(data);
}));

/**
 * GET /api/movies/:id/recommendations
 * Returns recommended movies based on a movie.
 */
router.get("/:id/recommendations", asyncHandler(async (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const data = await getMovieRecommendations(req.params.id, page);
  res.status(200).json(data);
}));

/**
 * GET /api/movies/:id/similar
 * Returns similar movies.
 */
router.get("/:id/similar", asyncHandler(async (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const data = await getSimilarMovies(req.params.id, page);
  res.status(200).json(data);
}));

/**
 * GET /api/movies/:id
 * Returns full details for a single movie.
 */
router.get("/:id", asyncHandler(async (req, res) => {
  const data = await getMovie(req.params.id);
  res.status(200).json(data);
}));

export default router;