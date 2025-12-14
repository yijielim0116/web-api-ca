import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Tooltip from "@mui/material/Tooltip";
import { MoviesContext } from "../../contexts/moviesContext";

export default function PlaylistAdd({ movie }) {
  const { addToMustWatch, mustWatch } = useContext(MoviesContext);
  const inList = mustWatch.includes(movie.id);

  return (
    <Tooltip title={inList ? "In Watchlist" : "Add to Watchlist"}>
      <span>
        <IconButton
          aria-label="add to watchlist"
          disabled={inList}
          onClick={() => addToMustWatch(movie)}
        >
          <PlaylistAddIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
}