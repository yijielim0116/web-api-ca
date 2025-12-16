import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { getMyReviewsForMovie, createReview, deleteReview } from "../../api/reviews-api";

const MyReview = ({ movieId, token }) => {
  const qc = useQueryClient();

  const authToken = useMemo(() => {
    return (
      token ||
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      sessionStorage.getItem("token") ||
      ""
    );
  }, [token]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myReview", { movieId }],
    queryFn: () => getMyReviewsForMovie(authToken, movieId),
    enabled: !!authToken && !!movieId,
    staleTime: 0,
  });

  const existing = Array.isArray(data) ? data[0] : null;

  const [content, setContent] = useState(existing?.content || "");
  const [rating, setRating] = useState(existing?.rating ?? 8);

  React.useEffect(() => {
    if (existing) {
      setContent(existing.content || "");
      setRating(existing.rating ?? 8);
    }
  }, [existing]);

  const createMut = useMutation({
    mutationFn: (payload) => createReview(authToken, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myReview", { movieId }] }),
  });

  const deleteMut = useMutation({
    mutationFn: (reviewId) => deleteReview(authToken, reviewId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myReview", { movieId }] }),
  });

  if (!authToken) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="body1">Login required to create “My Review”.</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        My Review
      </Typography>

      {isLoading ? (
        <Typography variant="body2">Loading…</Typography>
      ) : isError ? (
        <Typography color="error" variant="body2">
          {error?.message || "Failed to load review."}
        </Typography>
      ) : existing ? (
        <Stack spacing={1.5}>
          <Typography variant="body1">{existing.content}</Typography>
          <Typography variant="body2">Rating: {existing.rating}</Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteMut.mutate(existing._id)}
            disabled={deleteMut.isPending}
          >
            Delete
          </Button>
        </Stack>
      ) : (
        <Stack spacing={1.5}>
          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            minRows={3}
          />
          <TextField
            label="Rating (1-10)"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            inputProps={{ min: 1, max: 10 }}
          />
          <Button
            variant="contained"
            onClick={() =>
              createMut.mutate({
                movieId,
                content: String(content || "").trim(),
                rating: Number(rating),
              })
            }
            disabled={createMut.isPending}
          >
            Submit
          </Button>
        </Stack>
      )}
    </Paper>
  );
};

export default MyReview;