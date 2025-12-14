import React from "react";
import { useParams, Link as RouterLink } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Container from "@mui/material/Container";

import PageTemplate from "../components/templateMoviePage";
import MovieDetails from "../components/movieDetails";
import Spinner from "../components/spinner";
import { getMovie } from "../api/tmdb-api";

import BreadcrumbsBar from "../components/BreadcrumbsBar"; 

const MoviePage = () => {
  const { id } = useParams();

  const {
    data: movie,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
    staleTime: 360000,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;
  if (!movie) return <p>Waiting for movie details…</p>;

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <BreadcrumbsBar
          items={[
            { label: "Home", href: "/" },
            { label: "Movie", href: "/" },
            { label: movie.title },
          ]}
        />
      </Container>

      <PageTemplate movie={movie}>
        <MovieDetails movie={movie} />
      </PageTemplate>
    </>
  );
};

export default MoviePage;