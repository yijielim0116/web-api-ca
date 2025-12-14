import React, { useContext } from "react";
import { useQueries } from "@tanstack/react-query";
import { MoviesContext } from "../contexts/moviesContext";
import { getMovie } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";

const WatchlistPage = () => {
  const { mustWatch } = useContext(MoviesContext);

  const results = useQueries({
    queries: (mustWatch ?? []).map((id) => ({
      queryKey: ["movie", { id }],
      queryFn: getMovie,
      enabled: !!id,
      staleTime: 360000,
    })),
  });

  const isLoading = results.some((r) => r.isLoading);
  if (isLoading) return <Spinner />;

  const anyError = results.find((r) => r.isError);
  if (anyError) return <h1>{anyError.error?.message || "Failed to load watchlist."}</h1>;

  // <-- THIS replaces the bad "const movies = data.results"
  const movies = results.map((r) => r.data).filter(Boolean);

  return (
    <PageTemplate
      title="My Watchlist"
      movies={movies}
      action={(movie) => <RemoveFromWatchlist movie={movie} />}
    />
  );
};

export default WatchlistPage;