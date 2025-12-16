export const getMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/discover`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getMovie = (args) => {
  const [, { id }] = args.queryKey;
  return fetch(
    `http://localhost:8080/api/movies/${id}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getGenres = () => {
  return fetch(
    `http://localhost:8080/api/movies/genres`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getMovieImages = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(
    `http://localhost:8080/api/movies/${id}/images`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getUpcomingMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/upcoming`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getTrendingMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/trending`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getTopRatedMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/topRated`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getPopularMovies = ({ queryKey }) => {
  const [, { page = 1 } = {}] = queryKey;
  return fetch(
    `http://localhost:8080/api/movies/popular?page=${page}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  });
};

export const getNowPlayingMovies = ({ page = 1 } = {}) => {
  return fetch(
    `http://localhost:8080/api/movies/nowPlaying?page=${page}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getMovieCredits = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(
    `http://localhost:8080/api/movies/${id}/credits`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  });
};

export const getMovieRecommendations = ({ queryKey }) => {
  const [, { id, page = 1 }] = queryKey;
  return fetch(
    `http://localhost:8080/api/movies/${id}/recommendations?page=${page}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  });
};

export const getSimilarMovies = ({ queryKey }) => {
  const [, { id, page = 1 }] = queryKey;
  return fetch(
    `http://localhost:8080/api/movies/${id}/similar?page=${page}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  });
};

export const getPersonDetails = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(
    `http://localhost:8080/api/movies/person/${id}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  });
};

export const getPersonCombinedCredits = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(
    `http://localhost:8080/api/movies/person/${id}/combined_credits`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  });
};

export const getCollectionDetails = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(
    `http://localhost:8080/api/movies/collection/${id}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  });
};

export const searchMovies = ({ queryKey }) => {
  const [, { query = "", page = 1 }] = queryKey;
  return fetch(
    `http://localhost:8080/api/movies/search?q=${encodeURIComponent(query)}&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  });
};

export const getMovieReviews = (id) => {
  return fetch(`http://localhost:8080/api/movies/${id}/reviews`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    });
};