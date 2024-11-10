// src/pages/Login.jsx
import { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import HttpsIcon from "@mui/icons-material/Https";
import { useNavigate } from "react-router-dom";
import { SERVER_ENDPOINT } from "../config";
import { AuthContext } from "../context/AuthContext";
import { PresentationContext } from "../context/PresentationContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { saveToken } = useContext(AuthContext);
  const { fetchPres } = useContext(PresentationContext)
  const [navTrigger, setNavTrigger] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!open && navTrigger) {
      navigate("/dashboard");
    }
  }, [open, navTrigger, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("login:", { email: email, password });

    const body = JSON.stringify({
      email: email,
      password: password,
    });

    try {
      const data = await (
        await fetch(SERVER_ENDPOINT + "/admin/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        })
      ).json();

      if (data.token) {
        saveToken(data.token);
        setNavTrigger(true);
        setMsg("Login Successfully!");
        fetchPres();
      } else {
        setMsg("Username or password not correct");
      }
    } catch (error) {
      console.log(error);
      setMsg(error);
    }
    setOpen(true);
  };

  return (
    <Container maxWidth="sm">
      <Snackbar
        open={open}
        autoHideDuration={!navTrigger ? 3000 : 1000}
        message={msg}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setOpen(false);
          setMsg("");
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
      <Box
        sx={{ mt: 5, pt: 3, px: 5, pb: 10, backgroundColor: "white" }}
        borderRadius={2}
        boxShadow={3}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          textAlign={"center"}
          sx={{ mb: 3 }}
        >
          Welcome Back!
        </Typography>
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            id="email"
            label="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              },
            }}
            required
          />
          <TextField
            id="password"
            label="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsIcon />
                  </InputAdornment>
                ),
              },
            }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
