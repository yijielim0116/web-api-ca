import React from "react";
import Grid from "@mui/material/Grid";
import MovieCard from "../movieCard";

export default function MovieList({
  movies = [],
  action,
  columns = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
  spacing = 2,
}) {
  const safeCols = {
    xs: Math.max(1, columns.xs ?? 1),
    sm: Math.max(1, columns.sm ?? columns.xs ?? 1),
    md: Math.max(1, columns.md ?? columns.sm ?? 2),
    lg: Math.max(1, columns.lg ?? columns.md ?? 3),
    xl: Math.max(1, columns.xl ?? columns.lg ?? 4),
  };

  const span = {
    xs: Math.max(1, Math.floor(12 / safeCols.xs)),
    sm: Math.max(1, Math.floor(12 / safeCols.sm)),
    md: Math.max(1, Math.floor(12 / safeCols.md)),
    lg: Math.max(1, Math.floor(12 / safeCols.lg)),
    xl: Math.max(1, Math.floor(12 / safeCols.xl)),
  };

  return (
    <Grid container spacing={spacing}>
      {movies.map((m) => (
        <Grid
          key={m.id}
          item
          xs={span.xs}
          sm={span.sm}
          md={span.md}
          lg={span.lg}
          xl={span.xl}
        >
          <MovieCard movie={m} action={action} />
        </Grid>
      ))}
    </Grid>
  );
}