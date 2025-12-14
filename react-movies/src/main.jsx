import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router"; 
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CssBaseline from "@mui/material/CssBaseline";

import ColorModeProvider from "./contexts/colorModeContext";
import SiteHeader from "./components/siteHeader";
import MoviesContextProvider from "./contexts/moviesContext";

import HomePage from "./pages/homepage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import UpcomingMoviesPage from "./pages/upComingMoviePage";
import TrendingThisWeekPage from "./pages/TrendingMoviesPage";
import TopRatedMovies from "./pages/topRatedMoviesPage";
import PopularMovies from "./pages/popularMoviesPage";
import NowPlayingMovies from "./pages/nowPlayingMoviesPage";
import PersonPage from "./pages/personPage";
import WatchlistPage from "./pages/watchlistPage.jsx";

import SnackbarHost from "./components/feedback/SnackbarHost";
import BackToTop from "./components/BackToTop";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,          // 6 minutes
      refetchInterval: 360000,    // 6 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <ColorModeProvider>
      {/* MUI base styles */}
      <CssBaseline />

      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MoviesContextProvider>
            {/* Header always visible */}
            <SiteHeader />

            {/* Global helpers (snackbar + back-to-top) */}
            <SnackbarHost />
            <BackToTop />

            {/* App routes */}
            <Routes>
              <Route path="/movies/nowPlaying" element={<NowPlayingMovies />} />
              <Route path="/movies/popular" element={<PopularMovies />} />
              <Route path="/movies/topRated" element={<TopRatedMovies />} />
              <Route path="/movies/trending/this-week" element={<TrendingThisWeekPage />} />
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/movies/watchlist" element={<WatchlistPage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/person/:id" element={<PersonPage />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MoviesContextProvider>
        </BrowserRouter>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ColorModeProvider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);