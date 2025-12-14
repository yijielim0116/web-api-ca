import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPersonDetails, getPersonCombinedCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

const PersonPage = () => {
  const { id } = useParams();

  const { data: details, isLoading: l1, isError: e1, error: err1 } = useQuery({
    queryKey: ["person", { id }],
    queryFn: getPersonDetails,
    staleTime: 360000,
  });

  const { data: credits, isLoading: l2, isError: e2, error: err2 } = useQuery({
    queryKey: ["personCombinedCredits", { id }],
    queryFn: getPersonCombinedCredits,
    staleTime: 360000,
  });

  if (l1 || l2) return <Spinner />;
  if (e1) return <h1>{err1.message}</h1>;
  if (e2) return <h1>{err2.message}</h1>;

  const knownFor = (credits?.cast || [])
    .filter((c) => c.media_type === "movie" && c.poster_path)
    .sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0))
    .slice(0, 12);

  const img = details.profile_path
    ? `https://image.tmdb.org/t/p/w185${details.profile_path}`
    : undefined;

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid xs={12} md={3}>
          <Stack spacing={2} alignItems="center">
            <Avatar src={img} alt={details.name} sx={{ width: 180, height: 180 }} />
            <Typography variant="h5">{details.name}</Typography>
            {details.known_for_department && (
              <Chip label={details.known_for_department} />
            )}
          </Stack>
        </Grid>
        <Grid xs={12} md={9}>
          <Typography variant="h6" gutterBottom>Biography</Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {details.biography || "No biography available."}
          </Typography>

          <Typography variant="h6" gutterBottom>Known for</Typography>
          <Grid container spacing={2}>
            {knownFor.map((m) => (
              <Grid key={m.id} xs={6} sm={4} md={3} lg={2}>
                <Link to={`/movies/${m.id}`} style={{ textDecoration: "none" }}>
                  <img
                    src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                    alt={m.title}
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                  <Typography variant="body2">{m.title}</Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PersonPage;