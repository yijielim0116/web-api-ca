import React from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function BackToTop() {
  const trigger = useScrollTrigger({ threshold: 200 });
  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Zoom in={trigger}>
      <Fab
        color="secondary"
        size="medium"
        onClick={handleClick}
        sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1200 }}
        aria-label="Back to top"
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}