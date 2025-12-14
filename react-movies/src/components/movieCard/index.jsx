import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";

import placeholder from "../../images/film-poster-placeholder.png";

export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);

  const isFav = favorites.includes(movie.id);
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : placeholder;

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        transition: "transform .15s ease, box-shadow .15s ease",
        "&:hover": { transform: "translateY(-3px)", boxShadow: 6 },
      }}
    >
      <CardHeader
        sx={{ pb: 0.5 }}
        title={
          <Typography
            variant="h6"
            sx={{
              lineHeight: 1.2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.4em",
            }}
          >
            {movie.title}
          </Typography>
        }
        avatar={
          isFav ? (
            <Avatar sx={{ bgcolor: "error.main" }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
      />

      {/* Clickable poster area */}
      <CardActionArea component={Link} to={`/movies/${movie.id}`}>
        {/* Forces 2:3 box; image covers */}
        <Box sx={{ position: "relative", pt: "150%", overflow: "hidden" }}>
          <Box
            component="img"
            loading="lazy"
            src={poster}
            alt={movie.title}
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform .25s ease",
              ".MuiCardActionArea-root:hover &": { transform: "scale(1.03)" },
            }}
          />
        </Box>
      </CardActionArea>

      <CardContent sx={{ pb: 0.5 }}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              <CalendarIcon sx={{ fontSize: 18, mr: 0.5 }} />
              {movie.release_date
                ? new Date(movie.release_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })
                : "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <Typography variant="body2" color="text.secondary">
              <StarRateIcon sx={{ fontSize: 18, mr: 0.5 }} />
              {(movie.vote_average ?? 0).toFixed(1)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 1, gap: 1 }}>
        {/* Keep your external actions (fav / playlist / etc) */}
        {action ? action(movie) : null}

        {/* Fallback add-to-fav if no custom action is provided */}
        {!action && !isFav && (
          <Button size="small" onClick={handleAddToFavorite}>
            Add to favourites
          </Button>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Button
          component={Link}
          to={`/movies/${movie.id}`}
          variant="outlined"
          size="small"
        >
          More info…
        </Button>
      </CardActions>
    </Card>
  );
}