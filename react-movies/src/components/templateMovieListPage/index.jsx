import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";

// --- sort helpers ---
const sorters = {
  popularity: (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0),
  rating: (a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0),
  release: (a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0),
};

const THIS_YEAR = new Date().getFullYear();

export default function MovieListPageTemplate({
  title,
  movies = [],
  action,
  page,          
  totalPages,    
  onPageChange,  
}) {
  
  const [titleFilter, setTitleFilter] = React.useState("");
  const [genreFilter, setGenreFilter] = React.useState("0"); 
  const [minRating, setMinRating] = React.useState(0);
  const [yearRange, setYearRange] = React.useState([1980, THIS_YEAR]);
  const [sortKey, setSortKey] = React.useState("popularity");

  const handleFilterChange = (type, value) => {
    switch (type) {
      case "name":
        setTitleFilter(value);
        break;
      case "genre":
        setGenreFilter(value);
        break;
      case "rating":
        setMinRating(Number(value));
        break;
      case "year":
        setYearRange(value); 
        break;
      case "sort":
        setSortKey(value);
        break;
      default:
        break;
    }
  };

  const displayed = React.useMemo(() => {
    let list = Array.isArray(movies) ? movies.slice() : [];

    if (titleFilter.trim()) {
      const q = titleFilter.toLowerCase();
      list = list.filter((m) => (m.title || "").toLowerCase().includes(q));
    }

    const gId = Number(genreFilter);
    if (gId > 0) {
      list = list.filter((m) => m.genre_ids?.includes(gId));
    }

    list = list.filter((m) => (m.vote_average ?? 0) >= minRating);

    list = list.filter((m) => {
      const y = Number((m.release_date || "").slice(0, 4));
      return Number.isFinite(y) && y >= yearRange[0] && y <= yearRange[1];
    });

    list.sort(sorters[sortKey] ?? sorters.popularity);
    return list;
  }, [movies, titleFilter, genreFilter, minRating, yearRange, sortKey]);

  return (
    <Container maxWidth={false} disableGutters sx={{ px: 0, mt: 3, mb: 5 }}>
      <Header title={title} />

       <Grid container spacing={2} alignItems="flex-start" sx={{ px: 2 }}>
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <FilterCard
            onUserInput={handleFilterChange}
            titleFilter={titleFilter}
            genreFilter={genreFilter}
            minRating={minRating}
            yearRange={yearRange}
            sortKey={sortKey}
          />
        </Grid>

        <Grid item xs={12} sm={8} md={9} lg={10}>
          <MovieList movies={displayed} action={action} />
          {typeof page === "number" &&
            typeof totalPages === "number" &&
            typeof onPageChange === "function" && (
              <Stack alignItems="center" sx={{ mt: 3 }}>
                <Pagination
                  page={page}
                  count={totalPages}
                  color="primary"
                  onChange={(_, p) => onPageChange(p)}
                />
              </Stack>
            )}
        </Grid>
      </Grid>
    </Container>
  );
}