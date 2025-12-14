import React, { createContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { makeTheme } from "../theme";

export const ColorModeContext = createContext({ toggle: () => {}, mode: "light" });

export default function ColorModeProvider({ children }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("mode");
    if (saved === "light" || saved === "dark") setMode(saved);
  }, []);

  const ctx = useMemo(
    () => ({
      mode,
      toggle: () => {
        setMode((m) => {
          const next = m === "light" ? "dark" : "light";
          localStorage.setItem("mode", next);
          return next;
        });
      },
    }),
    [mode]
  );

  const theme = useMemo(() => makeTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={ctx}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}