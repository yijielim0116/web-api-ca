import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import SkeletonGrid from "../components/skeletons/SkeletonGrid";  
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import PlaylistAdd from "../components/cardIcons/playlistAdd";

export default function TrendingThisWeekPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["trending", { page }],
    queryFn: getTrendingMovies,
    keepPreviousData: true,
    staleTime: 360000,
  });

  if (isLoading && !data) return <SkeletonGrid />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data?.results ?? [];
  const totalPages = Math.min(data?.total_pages ?? 1, 500);

  return (
    <PageTemplate
      title={`Trending This Week ${isFetching ? "(updating…)" : ""}`}
      movies={movies}
      action={(m) => (<><AddToFavoritesIcon movie={m} /><PlaylistAdd movie={m} /></>)}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  );
}