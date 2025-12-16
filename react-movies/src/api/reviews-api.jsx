const BASE = "http://localhost:8080/api/reviews";

const authHeader = (token) => {
  if (!token) return {};
  const t = String(token).trim();
  const pure = t.toLowerCase().startsWith("bearer ") ? t.slice(7).trim() : t;
  return { Authorization: `Bearer ${pure}` };
};

const parse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || data?.msg || "Something went wrong");
  return data;
};

export const getMyReviewsForMovie = (token, movieId) => {
  return fetch(`${BASE}/movie/${movieId}`, {
    headers: { ...authHeader(token) },
  }).then(parse);
};

export const createReview = (token, { movieId, content, rating }) => {
  return fetch(`${BASE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(token),
    },
    body: JSON.stringify({ movieId, content, rating }),
  }).then(parse);
};

export const deleteReview = (token, reviewId) => {
  return fetch(`${BASE}/${reviewId}`, {
    method: "DELETE",
    headers: { ...authHeader(token) },
  }).then(async (res) => {
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      throw new Error(e?.message || "Something went wrong");
    }
    return true;
  });
};