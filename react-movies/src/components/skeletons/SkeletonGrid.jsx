import React from "react";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";

export default function SkeletonGrid({ count = 12 }) {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: count }).map((_, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <Card sx={{ p: 1.5 }}>
            <Skeleton variant="rectangular" height={340} />
            <Skeleton sx={{ mt: 1 }} width="60%" />
            <Skeleton width="40%" />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}