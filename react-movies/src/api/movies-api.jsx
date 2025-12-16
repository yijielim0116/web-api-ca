const BASE = "http://localhost:8080/api/movies";

async function parse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.msg || "Request failed");
  return data;
}

export const getFavourites = async (token) => {
  const res = await fetch(`${BASE}/favourites`, {
    headers: { Authorization: token },
  });
  return parse(res);
};

export const addFavourite = async (token, movie) => {
  const res = await fetch(`${BASE}/favourites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      movieId: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
    }),
  });
  return parse(res);
};

export const removeFavourite = async (token, movieId) => {
  const res = await fetch(`${BASE}/favourites/${movieId}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  if (!res.ok) throw new Error("Failed to remove favourite");
};

export const getWatchlist = async (token) => {
  const res = await fetch(`${BASE}/watchlist`, {
    headers: { Authorization: token },
  });
  return parse(res);
};

export const addWatchlist = async (token, movie) => {
  const res = await fetch(`${BASE}/watchlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      movieId: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
    }),
  });
  return parse(res);
};

export const removeWatchlist = async (token, movieId) => {
  const res = await fetch(`${BASE}/watchlist/${movieId}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  if (!res.ok) throw new Error("Failed to remove watchlist");
};