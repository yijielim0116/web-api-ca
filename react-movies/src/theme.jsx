import { createTheme } from "@mui/material/styles";

export const makeTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#7B1FA2" },     
      secondary: { main: "#26C6DA" },  
    },
    shape: { borderRadius: 14 },
    components: {
      MuiContainer: { defaultProps: { maxWidth: "xl" } },
      MuiCard: {
        styleOverrides: {
          root: { transition: "transform .12s ease, box-shadow .12s ease" },
        },
      },
    },
  });