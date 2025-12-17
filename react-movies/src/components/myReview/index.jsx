import React, { useMemo, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// API functions for interacting with the Reviews backend
import {
  getMyReviewsForMovie,
  createReview,
  deleteReview,
} from "../../api/reviews-api";

/**
 * MyReview component
 * ------------------
 * Displays and manages the logged-in user's review for a specific movie.
 * - If the user is not logged in, a message is shown.
 * - If the user has already reviewed the movie, the review is displayed with a delete option.
 * - Otherwise, a form is shown allowing the user to submit a new review.
 */
const MyReview = ({ movieId, token }) => {
  const queryClient = useQueryClient();

  /**
   * Determine the authentication token.
   * Priority:
   *  1. token passed as prop
   *  2. token stored in localStorage/sessionStorage
   *
   * useMemo ensures this value is only recalculated when `token` changes.
   */
  const authToken = useMemo(() => {
    return (
      token ||
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      sessionStorage.getItem("token") ||
      ""
    );
  }, [token]);

  /**
   * Fetch the logged-in user's review for this movie.
   * Backend endpoint:
   *   GET /api/reviews/movie/:movieId
   *
   * This query:
   * - Runs only when both `authToken` and `movieId` exist
   * - Always fetches fresh data (staleTime = 0)
   */
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myReview", { movieId }],
    queryFn: () => getMyReviewsForMovie(authToken, movieId),
    enabled: !!authToken && !!movieId,
    staleTime: 0,
  });

  // Backend returns an array; only one review per user per movie is expected
  const existing = Array.isArray(data) ? data[0] : null;

  // Local form state
  const [content, setContent] = useState(existing?.content || "");
  const [rating, setRating] = useState(existing?.rating ?? 8);

  /**
   * Sync local form state when an existing review is loaded
   */
  useEffect(() => {
    if (existing) {
      setContent(existing.content || "");
      setRating(existing.rating ?? 8);
    }
  }, [existing]);

  /**
   * Mutation: create a new review
   * Backend endpoint:
   *   POST /api/reviews
   *
   * On success, invalidate the query so the UI refreshes automatically.
   */
  const createMut = useMutation({
    mutationFn: (payload) => createReview(authToken, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["myReview", { movieId }] }),
  });

  /**
   * Mutation: delete an existing review
   * Backend endpoint:
   *   DELETE /api/reviews/:reviewId
   *
   * On success, refresh the user's review data.
   */
  const deleteMut = useMutation({
    mutationFn: (reviewId) => deleteReview(authToken, reviewId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["myReview", { movieId }] }),
  });

  /**
   * If the user is not authenticated, show a message instead of the review UI
   */
  if (!authToken) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="body1">
          Login required to create “My Review”.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        My Review
      </Typography>

      {/* Loading state */}
      {isLoading ? (
        <Typography variant="body2">Loading…</Typography>

      /* Error state */
      ) : isError ? (
        <Typography color="error" variant="body2">
          {error?.message || "Failed to load review."}
        </Typography>

      /* Existing review found */
      ) : existing ? (
        <Stack spacing={1.5}>
          <Typography variant="body1">{existing.content}</Typography>
          <Typography variant="body2">
            Rating: {existing.rating}
          </Typography>

          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteMut.mutate(existing._id)}
            disabled={deleteMut.isPending}
          >
            Delete
          </Button>
        </Stack>

      /* No review yet – show create form */
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
            label="Rating (1–10)"
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