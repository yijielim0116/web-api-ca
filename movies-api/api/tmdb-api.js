import fetch from "node-fetch";

const TMDB_BASE = "https://api.themoviedb.org/3";

const requireKey = () => {
  const key = process.env.TMDB_KEY;
  if (!key) throw new Error("TMDB_KEY missing in movies-api/.env");
  return key;
};

const fetchJson = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.status_message || `TMDB error: ${response.status}`);
  }

  return response.json();
};

// Discover
export const getMovies = async () => {
  const key = requireKey();
  const url =`${TMDB_BASE}/discover/movie?api_key=${key}` + `&language=en-US&include_adult=false&include_video=false&page=1`;
  return fetchJson(url);
};

// Single movie details
export const getMovie = async (id) => {
  const key = requireKey();
  const url = `${TMDB_BASE}/movie/${id}?api_key=${key}&language=en-US`;
  return fetchJson(url);
};

// Upcoming
export const getUpcomingMovies = async () => {
  const key = requireKey();
  const url = `${TMDB_BASE}/movie/upcoming?api_key=${key}&language=en-US&page=1`;
  return fetchJson(url);
};

// Trending (week)
export const getTrendingMovies = async () => {
  const key = requireKey();
  const url = `${TMDB_BASE}/trending/all/week?api_key=${key}&language=en-US&page=1`;
  return fetchJson(url);
};

// Top rated
export const getTopRatedMovies = async () => {
  const key = requireKey();
  const url = `${TMDB_BASE}/movie/top_rated?api_key=${key}&language=en-US&page=1`;
  return fetchJson(url);
};

// Popular (supports page)
export const getPopularMovies = async (page = 1) => {
  const key = requireKey();
  const url = `${TMDB_BASE}/movie/popular?api_key=${key}&language=en-US&page=${page}`;
  return fetchJson(url);
};

// Now playing (supports page)
export const getNowPlayingMovies = async (page = 1) => {
  const key = requireKey();
  const url = `${TMDB_BASE}/movie/now_playing?api_key=${key}&language=en-US&page=${page}`;
  return fetchJson(url);
};

// Genres
export const getGenres = async () => {
  const key = requireKey();
  const url = `${TMDB_BASE}/genre/movie/list?api_key=${key}&language=en-US`;
  return fetchJson(url);
};

// Movie images
export const getMovieImages = async (id) => {
  const key = requireKey();
  const url = `${TMDB_BASE}/movie/${id}/images?api_key=${key}`;
  return fetchJson(url);
};

// Movie credits
export const getMovieCredits = async (id) => {
  const key = requireKey();
  const url = `${TMDB_BASE}/movie/${id}/credits?api_key=${key}&language=en-US`;
  return fetchJson(url);
};

// Recommendations Movies
export const getMovieRecommendations = async (id, page = 1) => {
  const key = requireKey();
  const url =
    `${TMDB_BASE}/movie/${id}/recommendations?api_key=${key}` +
    `&language=en-US&page=${page}`;
  return fetchJson(url);
};

// Similar Movies
export const getSimilarMovies = async (id, page = 1) => {
  const key = requireKey();
  const url =
    `${TMDB_BASE}/movie/${id}/similar?api_key=${key}` +
    `&language=en-US&page=${page}`;
  return fetchJson(url);
};

// Search Movies
export const searchMovies = async (q, page = 1) => {
  const key = requireKey();
  const query = encodeURIComponent(q || "");
  const url =
    `${TMDB_BASE}/search/movie?api_key=${key}` + `&language=en-US&query=${query}&page=${page}&include_adult=false`;
  return fetchJson(url);
};

export const getPersonDetails = async (id) => {
  const key = requireKey();
  const url = `${TMDB_BASE}/person/${id}?api_key=${key}&language=en-US`;
  return fetchJson(url);
};

export const getPersonCombinedCredits = async (id) => {
  const key = requireKey();
  const url = `${TMDB_BASE}/person/${id}/combined_credits?api_key=${key}&language=en-US`;
  return fetchJson(url);
};

export const getCollectionDetails = async (id) => {
  const key = requireKey();
  const url = `${TMDB_BASE}/collection/${id}?api_key=${key}&language=en-US`;
  return fetchJson(url);
};

