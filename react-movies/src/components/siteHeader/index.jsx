import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { ColorModeContext } from "../../contexts/colorModeContext";
import { AuthContext } from "../../contexts/authContext";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function SiteHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { toggle, mode } = useContext(ColorModeContext);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const publicLinks = [
    { label: "Discover", path: "/" },
    { label: "Trending", path: "/movies/trending/this-week" },
    { label: "Top-Rated", path: "/movies/topRated" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Now Playing", path: "/movies/nowPlaying" },
    { label: "Upcoming", path: "/movies/upcoming" },
  ];

  const privateLinks = [
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Watchlist", path: "/movies/watchlist" },
  ];

  const authLinks = auth.isAuthenticated
    ? [
        ...privateLinks,
        { label: `Logout (${auth.userName})`, action: "logout" },
      ]
    : [
        { label: "Login", path: "/login" },
        { label: "Signup", path: "/signup" },
      ];

  const menuItems = [...publicLinks, ...authLinks];

  const handleSelect = (item) => {
    setAnchorEl(null);

    if (item.action === "logout") {
      auth.signout();
      navigate("/");
      return;
    }

    navigate(item.path);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>

          {!isMobile &&
            menuItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                onClick={() => handleSelect(item)}
              >
                {item.label}
              </Button>
            ))}

          <Tooltip title={mode === "light" ? "Dark mode" : "Light mode"}>
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
                {menuItems.map((item) => (
                  <MenuItem key={item.label} onClick={() => handleSelect(item)}>
                    {item.label}
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