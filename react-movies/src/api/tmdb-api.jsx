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
  })
  .catch((error) => {
      throw error
  });
};

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

  
export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        import.meta.env.VITE_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
};


export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
};


export const getMovieReviews = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};

export const getUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
}

export const getTrendingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getTopRatedMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getPopularMovies = ({ queryKey }) => {
  const [, { page = 1 } = {}] = queryKey;
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
  ).then(async (response) => {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Something went wrong");
    }
    return response.json();
  });
};

export const getNowPlayingMovies = ({ page = 1 } = {}) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getMovieCredits = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  ).then(async (r) => {
    if (!r.ok) throw new Error((await r.json()).status_message || "Something went wrong");
    return r.json();
  });
};

export const getMovieRecommendations = ({ queryKey }) => {
  const [, { id, page = 1 }] = queryKey;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
  ).then(async (r) => {
    if (!r.ok) throw new Error((await r.json()).status_message || "Something went wrong");
    return r.json();
  });
};

export const getSimilarMovies = ({ queryKey }) => {
  const [, { id, page = 1 }] = queryKey;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
  ).then(async (r) => {
    if (!r.ok) throw new Error((await r.json()).status_message || "Something went wrong");
    return r.json();
  });
};

export const getPersonDetails = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  ).then(async (r) => {
    if (!r.ok) throw new Error((await r.json()).status_message || "Something went wrong");
    return r.json();
  });
};

export const getPersonCombinedCredits = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  ).then(async (r) => {
    if (!r.ok) throw new Error((await r.json()).status_message || "Something went wrong");
    return r.json();
  });
};

export const getCollectionDetails = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(
    `https://api.themoviedb.org/3/collection/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  ).then(async (r) => {
    if (!r.ok) throw new Error((await r.json()).status_message || "Something went wrong");
    return r.json();
  });
};

export const searchMovies = ({ queryKey }) => {
  const [, { query = "", page = 1 }] = queryKey;
  const q = encodeURIComponent(query);
  return fetch(
  `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&query=${q}&page=${page}&include_adult=false`
).then(async (r) => {
  if (!r.ok) {
    throw new Error((await r.json()).status_message || "Something went wrong");
  }
  return r.json();
});
};