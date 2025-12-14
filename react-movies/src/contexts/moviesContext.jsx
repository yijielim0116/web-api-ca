import React, { useEffect, useState } from "react";
import { showSnack } from "../components/feedback/SnackbarHost"; 

export const MoviesContext = React.createContext(null);

const LS_FAV = "favorites_v1";
const LS_MUST = "mustwatch_v1";
const LS_REV = "reviews_v1";

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_FAV)) ?? [];
    } catch {
      return [];
    }
  });

  const [mustWatch, setMustWatch] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_MUST)) ?? [];
    } catch {
      return [];
    }
  });

  const [myReviews, setMyReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_REV)) ?? {};
    } catch {
      return {};
    }
  });

  // persist
  useEffect(() => {
    localStorage.setItem(LS_FAV, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(LS_MUST, JSON.stringify(mustWatch));
  }, [mustWatch]);

  useEffect(() => {
    localStorage.setItem(LS_REV, JSON.stringify(myReviews));
  }, [myReviews]);

  // favourites
  const addToFavorites = (movie) => {
    if (favorites.includes(movie.id)) {
      showSnack("Already in Favorites");
      return;
    }
    setFavorites((prev) => [...prev, movie.id]);
    showSnack("Added to Favorites");
  };

  const removeFromFavorites = (movie) => {
    setFavorites((prev) => prev.filter((id) => id !== movie.id));
    showSnack("Removed from Favorites");
  };

  // reviews
  const addReview = (movie, review) => {
    setMyReviews((prev) => ({ ...prev, [movie.id]: review }));
    showSnack("Review saved");
  };

  const removeReview = (movieId) => {
    setMyReviews(({ [movieId]: _omit, ...rest }) => rest);
    showSnack("Review removed");
  };

  // watchlist
  const addToMustWatch = (movie) => {
    if (mustWatch.includes(movie.id)) {
      showSnack("Already in Watchlist");
      return;
    }
    setMustWatch((prev) => [...prev, movie.id]);
    showSnack("Added to Watchlist");
  };

  const removeFromMustWatch = (movie) => {
    setMustWatch((prev) => prev.filter((id) => id !== movie.id));
    showSnack("Removed from Watchlist");
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