import React from "react";
import { useQuery } from "@tanstack/react-query";
import {Card,CardContent,CardMedia,Typography,TextField,InputLabel,MenuItem,FormControl,Select,Slider,Box,Divider,} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import StarRateIcon from "@mui/icons-material/StarRate";
import EventIcon from "@mui/icons-material/Event";

import { getGenres } from "../../api/tmdb-api";
import filterImg from "../../images/Watch-Free-Hero-2048x1152-1.webp";

const formControl = {
  my: 1,
  minWidth: "90%",
  backgroundColor: "rgb(255, 255, 255)",
};

const thisYear = new Date().getFullYear();

export default function FilterMoviesCard({
  titleFilter = "",
  genreFilter = "0",
  minRating = 0,
  yearRange = [1980, thisYear],
  sortKey = "popularity",

  onUserInput = () => {},
}) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    staleTime: 24 * 60 * 60 * 1000, 
  });

  if (isPending) {
    return (
      <Card variant="outlined" sx={{ backgroundColor: "rgb(204, 204, 0)" }}>
        <CardContent>
          <Typography variant="h6">Loading filters…</Typography>
        </CardContent>
      </Card>
    );
  }
  if (isError) {
    return (
      <Card variant="outlined" sx={{ backgroundColor: "rgb(204, 204, 0)" }}>
        <CardContent>
          <Typography color="error">{error.message}</Typography>
        </CardContent>
      </Card>
    );
  }

  const genres = [...(data?.genres ?? [])];
  if (!genres.find((g) => g.id === 0)) {
    genres.unshift({ id: 0, name: "All" });
  }

  const handleText = (e) => onUserInput("name", e.target.value);
  const handleGenre = (e) => onUserInput("genre", String(e.target.value));
  const handleRating = (_e, v) => onUserInput("rating", Number(v));
  const handleYear = (_e, v) => onUserInput("year", v); 
  const handleSort = (e) => onUserInput("sort", e.target.value);

  return (
    <Card variant="outlined" sx={{ backgroundColor: "rgb(204, 204, 0)" }}>
      <CardContent>
        <Typography variant="h5" component="h1" sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <SearchIcon fontSize="large" />
          Filter Movies
        </Typography>

        <TextField
          sx={formControl}
          label="Search by title"
          variant="filled"
          value={titleFilter}
          onChange={handleText}
          fullWidth
        />

        <FormControl sx={formControl} variant="filled" fullWidth>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={genreFilter}
            label="Genre"
            onChange={handleGenre}
          >
            {genres.map((g) => (
              <MenuItem key={g.id} value={String(g.id)}>
                {g.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ px: 1, mb: 1 }}>
          <Typography variant="subtitle2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <StarRateIcon fontSize="small" /> Rating (min): {minRating.toFixed(1)}
          </Typography>
          <Slider
            size="small"
            min={0}
            max={10}
            step={0.5}
            value={minRating}
            valueLabelDisplay="auto"
            onChange={handleRating}
          />
        </Box>

        <Box sx={{ px: 1, mb: 1 }}>
          <Typography variant="subtitle2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EventIcon fontSize="small" /> Release Year: {yearRange[0]} – {yearRange[1]}
          </Typography>
          <Slider
            size="small"
            min={1970}
            max={thisYear}
            step={1}
            value={yearRange}
            valueLabelDisplay="auto"
            onChange={handleYear}
          />
        </Box>
 
        <FormControl sx={formControl} variant="filled" fullWidth>
          <InputLabel id="sort-by-label">Sort by</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by"
            value={sortKey}
            label="Sort by"
            onChange={handleSort}
            startAdornment={<SortIcon sx={{ mr: 1 }} />}
          >
            <MenuItem value="popularity">Popularity</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="release">Release date</MenuItem>
          </Select>
        </FormControl>
      </CardContent>

      <CardMedia
        component="img"
        image={filterImg}
        alt="Filter background"
        sx={{ height: { xs: 150, md: 240 }, objectFit: "cover" }}
      />
    </Card>
  );
}
