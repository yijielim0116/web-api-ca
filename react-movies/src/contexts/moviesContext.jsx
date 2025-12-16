import React, { useContext, useEffect, useMemo, useState } from "react";
import { showSnack } from "../components/feedback/SnackbarHost";
import { AuthContext } from "./authContext";

// eslint-disable-next-line react-refresh/only-export-components
export const MoviesContext = React.createContext(null);

const API = "http://localhost:8080/api/movies";
const LS_REV = "reviews_v1";

const MoviesContextProvider = (props) => {
  const auth = useContext(AuthContext);

  const token = auth?.authToken || localStorage.getItem("token") || "";
  const isAuthed = auth?.isAuthenticated && !!token;

  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]);

  const [myReviews, setMyReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_REV)) ?? {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_REV, JSON.stringify(myReviews));
  }, [myReviews]);

  const authHeaders = useMemo(() => {
    return token ? { Authorization: token } : {};
  }, [token]);

  const loadLists = async () => {
    if (!token) return;

    try {
      const [favRes, watchRes] = await Promise.all([
        fetch(`${API}/favourites`, { headers: authHeaders }),
        fetch(`${API}/watchlist`, { headers: authHeaders }),
      ]);

      const favJson = await favRes.json().catch(() => []);
      const watchJson = await watchRes.json().catch(() => []);

      if (!favRes.ok) throw new Error(favJson.msg || "Failed to load favourites");
      if (!watchRes.ok) throw new Error(watchJson.msg || "Failed to load watchlist");

      setFavorites(favJson.map((d) => d.movieId));
      setMustWatch(watchJson.map((d) => d.movieId));
    } catch (e) {
      showSnack(e.message || "Failed to load lists");
      setFavorites([]);
      setMustWatch([]);
    }
  };

  useEffect(() => {
    if (isAuthed) {
      loadLists();
    } else {
      setFavorites([]);
      setMustWatch([]);
    }
  }, [isAuthed, token]);

  const addToFavorites = async (movie) => {
    if (!isAuthed) {
      showSnack("Please login to use favourites");
      return;
    }
    if (favorites.includes(movie.id)) {
      showSnack("Already in Favorites");
      return;
    }

    try {
      const res = await fetch(`${API}/favourites`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({
          movieId: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.msg || "Failed to add favourite");

      setFavorites((prev) => [...prev, movie.id]);
      showSnack("Added to Favorites");
    } catch (e) {
      showSnack(e.message || "Failed to add favourite");
    }
  };

  const removeFromFavorites = async (movie) => {
    if (!isAuthed) return;

    try {
      const res = await fetch(`${API}/favourites/${movie.id}`, {
        method: "DELETE",
        headers: { ...authHeaders },
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.msg || "Failed to remove favourite");
      }

      setFavorites((prev) => prev.filter((id) => id !== movie.id));
      showSnack("Removed from Favorites");
    } catch (e) {
      showSnack(e.message || "Failed to remove favourite");
    }
  };

  const addToMustWatch = async (movie) => {
    if (!isAuthed) {
      showSnack("Please login to use watchlist");
      return;
    }
    if (mustWatch.includes(movie.id)) {
      showSnack("Already in Watchlist");
      return;
    }

    try {
      const res = await fetch(`${API}/watchlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({
          movieId: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.msg || "Failed to add watchlist");

      setMustWatch((prev) => [...prev, movie.id]);
      showSnack("Added to Watchlist");
    } catch (e) {
      showSnack(e.message || "Failed to add watchlist");
    }
  };

  const removeFromMustWatch = async (movie) => {
    if (!isAuthed) return;

    try {
      const res = await fetch(`${API}/watchlist/${movie.id}`, {
        method: "DELETE",
        headers: { ...authHeaders },
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.msg || "Failed to remove watchlist");
      }

      setMustWatch((prev) => prev.filter((id) => id !== movie.id));
      showSnack("Removed from Watchlist");
    } catch (e) {
      showSnack(e.message || "Failed to remove watchlist");
    }
  };

  const addReview = (movie, review) => {
    setMyReviews((prev) => ({ ...prev, [movie.id]: review }));
    showSnack("Review saved");
  };

  const removeReview = (movieId) => {
    setMyReviews((prev) => {
      const copy = { ...prev };
      delete copy[movieId];
      return copy;
    });
    showSnack("Review removed");
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        myReviews,
        addReview,
        removeReview,
        mustWatch,
        addToMustWatch,
        removeFromMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;