import React, { createContext, useContext, useState, useCallback } from "react";

const SnackbarContext = createContext({ show: () => {} });
export const useSnackbar = () => useContext(SnackbarContext);

export default function SnackbarProvider({ children }) {
  const [snack, setSnack] = useState({ open: false, message: "" });
  const show = useCallback((message) => setSnack({ open: true, message }), []);

  const value = { show };
  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
}