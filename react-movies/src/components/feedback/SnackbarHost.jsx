import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SnackbarHost() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  // Listen for custom events fired by the snackbar helper
  React.useEffect(() => {
    const handler = (e) => {
      setMessage(e.detail);
      setOpen(true);
    };
    window.addEventListener("app:snackbar", handler);
    return () => window.removeEventListener("app:snackbar", handler);
  }, []);

  return (
    <Snackbar open={open} autoHideDuration={2400} onClose={() => setOpen(false)}>
      <Alert onClose={() => setOpen(false)} severity="success" variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

/** Helper you can import anywhere to show a snackbar */
export function showSnack(msg) {
  window.dispatchEvent(new CustomEvent("app:snackbar", { detail: msg }));
}