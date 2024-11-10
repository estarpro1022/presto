// src/pages/Register.jsx
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
import HttpsIcon from "@mui/icons-material/Https";
import { AccountCircle } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import { SERVER_ENDPOINT } from "../config";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { PresentationContext } from "../context/PresentationContext";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [match, setMatch] = useState(true);
  const { saveToken } = useContext(AuthContext);
  const { fetchPres } = useContext(PresentationContext);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [navTrigger, setNavTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!success && navTrigger) {
      navigate("/dashboard");
    }
  }, [success, navTrigger, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMatch(false);
      return;
    }
    setMatch(true);
    // 在这里处理注册逻辑
    console.log("register:", { name: name, password });

    const body = JSON.stringify({
      email: email,
      name: name,
      password: password,
    });

    try {
      const response = await fetch(SERVER_ENDPOINT + "/admin/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await response.json();
      if (data.token) {
        console.log("token:", data.token);
        saveToken(data.token);
        setSuccess(true);
        setNavTrigger(true);
        setOpen(false);
        setErrorMsg("");
        fetchPres();
      } else {
        console.log("Error: no token received");
        console.log("data:", data);
        setOpen(true);
        setSuccess(false);
        setErrorMsg(data.error);
      }
    } catch (error) {
      setOpen(true);
      setSuccess(false);
      setErrorMsg(error);
      console.log("Error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
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
          Let&apos;s Register a new Account!
        </Typography>
        <Box component="form" onSubmit={handleRegister}>
          <TextField
            id="email"
            label="email"
            type="email"
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
            id="username"
            label="username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
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
            error={!match}
            helperText={match ? "" : "The password entered does not match."}
            required
          />
          <TextField
            id="confirm"
            label="confirm"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            register
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000} // 设置自动消失时间，单位为毫秒
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setOpen(false);
          setErrorMsg("");
        }}
        message={errorMsg}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // 设置位置
      />
      <Snackbar
        open={success}
        autoHideDuration={1000}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setSuccess(false);
        }}
        message={"Register Successfully!"}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Container>
  );
}

export default Register;
