import React, { useState } from "react";
import { Link } from "react-router";           
import { useQuery } from "@tanstack/react-query";

import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";             

import MovieReviews from "../movieReviews";
import Spinner from "../spinner";
import { getMovieCredits, getMovieRecommendations, getCollectionDetails } from "../../api/tmdb-api";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ----- Parameterised data -----
  const {
    data: credits,
    isLoading: creditsLoading,
    isError: creditsError,
  } = useQuery({
    queryKey: ["movieCredits", { id: movie.id }],
    queryFn: getMovieCredits,
    staleTime: 360000,
  });

  const {
    data: recs,
    isLoading: recsLoading,
    isError: recsError,
  } = useQuery({
    queryKey: ["movieRecommendations", { id: movie.id, page: 1 }],
    queryFn: getMovieRecommendations,
    staleTime: 360000,
  });

  const collectionId = movie.belongs_to_collection?.id;
  const {
    data: collection,
    isLoading: colLoading,
    isError: colError,
  } = useQuery({
    queryKey: ["collection", { id: collectionId }],
    queryFn: getCollectionDetails,
    enabled: !!collectionId,
    staleTime: 360000,
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 2, pb: 8 }}>
      <Typography variant="h5" component="h3" gutterBottom>
        Overview
      </Typography>

      <Typography variant="h6" component="p" sx={{ mb: 2 }}>
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.id ?? g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip icon={<MonetizationIcon />} label={`${movie.revenue.toLocaleString()}`} />
        <Chip icon={<StarRate />} label={`${movie.vote_average} (${movie.vote_count})`} />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
        </li>
        {movie.production_countries.map((c) => (
          <li key={c.iso_3166_1}>
            <Chip label={c.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      {/* ---- CAST ---- */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>
        Top Billed Cast
      </Typography>
      {creditsLoading ? (
        <Spinner />
      ) : creditsError ? (
        <Typography color="error">Failed to load cast.</Typography>
      ) : (
        <Paper component="ul" sx={{ ...root, justifyContent: "flex-start" }}>
          {(credits?.cast || []).slice(0, 12).map((p) => {
            const headshot = p.profile_path
              ? `https://image.tmdb.org/t/p/w185${p.profile_path}`
              : undefined;
            return (
              <li key={p.id}>
                <Link to={`/person/${p.id}`} style={{ textDecoration: "none" }}>
                  <Chip
                    avatar={<Avatar src={headshot} alt={p.name} />}
                    label={p.name}
                    clickable
                    sx={{ ...chip }}
                    variant="outlined"
                  />
                </Link>
              </li>
            );
          })}
        </Paper>
      )}

      {/* ---- RECOMMENDATIONS ---- */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>
        Recommended
      </Typography>
      {recsLoading ? (
        <Spinner />
      ) : recsError ? (
        <Typography color="error">Failed to load recommendations.</Typography>
      ) : (
        <Grid container spacing={2}> {/* ✅ container */}
          {(recs?.results || []).slice(0, 12).map((r) => (
            <Grid item key={r.id} xs={6} sm={4} md={3} lg={2}> {/* ✅ item */}
              <Link to={`/movies/${r.id}`} style={{ textDecoration: "none" }}>
                <img
                  src={
                    r.poster_path
                      ? `https://image.tmdb.org/t/p/w342${r.poster_path}`
                      : ""
                  }
                  alt={r.title}
                  style={{ width: "100%", borderRadius: 8 }}
                />
                <Typography variant="body2">{r.title}</Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}

      {/* ---- COLLECTION (if any) ---- */}
      {collectionId && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            {collection?.name || "Collection"}
          </Typography>
          {colLoading ? (
            <Spinner />
          ) : colError ? (
            <Typography color="error">Failed to load collection.</Typography>
          ) : (
            <Grid container spacing={2}> {/* ✅ container */}
              {(collection?.parts || []).map((m) => (
                <Grid item key={m.id} xs={6} sm={4} md={3} lg={2}> {/* ✅ item */}
                  <Link to={`/movies/${m.id}`} style={{ textDecoration: "none" }}>
                    <img
                      src={
                        m.poster_path
                          ? `https://image.tmdb.org/t/p/w342${m.poster_path}`
                          : ""
                      }
                      alt={m.title}
                      style={{ width: "100%", borderRadius: 8 }}
                    />
                    <Typography variant="body2">{m.title}</Typography>
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {/* Reviews drawer trigger */}
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{ position: "fixed", bottom: "1em", right: "1em" }}
      >
        <NavigationIcon />
        Reviews
      </Fab>

      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </Container>
  );
};

export default MovieDetails;