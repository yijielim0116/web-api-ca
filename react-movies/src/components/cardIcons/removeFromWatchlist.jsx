import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { MoviesContext } from "../../contexts/moviesContext";

export default function RemoveFromWatchlist({ movie }) {
  const { removeFromMustWatch } = useContext(MoviesContext);
  return (
    <Tooltip title="Remove from Watchlist">
      <IconButton onClick={() => removeFromMustWatch(movie)}>
        <PlaylistRemoveIcon />
      </IconButton>
    </Tooltip>
  );
}