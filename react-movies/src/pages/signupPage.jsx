import { useContext, useState } from "react";
import { Box, Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/authContext";

const SignupPage = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("error");

  const register = async () => {
    if (password !== confirm) {
      setSeverity("error");
      setMsg("Passwords do not match");
      setOpen(true);
      return;
    }

    try {
      const success = await context.register(userName, password);
      if (success) {
        setSeverity("success");
        setMsg("Registration successful. Please log in.");
        setOpen(true);
        setTimeout(() => navigate("/login"), 1500);
      } else {
        throw new Error("Registration failed");
      }
    } catch (err) {
      setSeverity("error");
      setMsg(err.message || "Username already exists or password is invalid");
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: 360 }}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>

        <Typography sx={{ mb: 2 }}>
          Usernames must be unique. Passwords must contain at least 8 characters,
          including upper & lower case letters and a symbol.
        </Typography>

        <TextField
          fullWidth
          label="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Confirm password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button fullWidth variant="contained" onClick={register}>
          Register
        </Button>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {msg}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default SignupPage;