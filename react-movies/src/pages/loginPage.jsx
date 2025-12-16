import { useContext, useState } from "react";
import { Navigate, useLocation, Link } from "react-router";
import { Snackbar, Alert, Box, Button, TextField, Typography } from "@mui/material";
import { AuthContext } from "../contexts/authContext";

const LoginPage = () => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const login = async () => {
    try {
      await context.authenticate(userName, password);
    } catch (err) {
      setMsg(err.message || "Invalid username or password");
      setOpen(true);
    }
  };

  if (context.isAuthenticated) {
    return <Navigate to={from} replace />;
  }

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
          Login
        </Typography>
        <Typography sx={{ mb: 2 }}>
          You must log in to view the protected pages
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

        <Button fullWidth variant="contained" onClick={login}>
          Log in
        </Button>

        <Typography sx={{ mt: 2 }}>
          Not registered? <Link to="/signup">Sign up</Link>
        </Typography>

        <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
          <Alert severity="error">{msg}</Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default LoginPage;