import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import { ColorModeContext } from "../../contexts/colorModeContext";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function SiteHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { toggle, mode } = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Trending", path: "/movies/trending/this-week" },
    { label: "Top-Rated", path: "/movies/topRated" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Now Playing", path: "/movies/nowPlaying" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Watchlist", path: "/movies/watchlist" },
  ];

  const handleMenuSelect = (path) => { setAnchorEl(null); navigate(path); };

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar sx={{ gap: 1 }}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>TMDB Client</Typography>

          {!isMobile &&
            menuOptions.map((opt) => (
              <Button key={opt.label} color="inherit" onClick={() => handleMenuSelect(opt.path)}>
                {opt.label}
              </Button>
            ))
          }

          <Tooltip title={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}>
            <IconButton color="inherit" onClick={toggle}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>

          {isMobile && (
            <>
              <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                {menuOptions.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
}
