import { useContext } from "react";
import { AppBar, Box, Divider, Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Dvr } from "@mui/icons-material";
import { AuthContext } from "./context/AuthContext";
import { PresentationContext } from "./context/PresentationContext";

function Header() {
  const { token, removeToken } = useContext(AuthContext);
  const { clearPres } = useContext(PresentationContext);

  return (
    <>
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Dvr sx={{ ml: 2, mr: 2, fontSize: 40 }} />
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Presto
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ fontSize: "15px", mr: {xs: 0, md: 1}, textTransform: "none" }}
          >
            Home
          </Button>
          {token && (
            <Button
              color="inherit"
              component={Link}
              to="/dashboard"
              sx={{ fontSize: "15px", mr: 1, textTransform: "none" }}
            >
              Dashboard
            </Button>
          )}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ backgroundColor: "white" }}
          />
          {!token ? (
            <Box color="inherit">
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{ fontSize: "15px", ml: 1, textTransform: "none" }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                variant="outlined"
                component={Link}
                to="/register"
                sx={{ fontSize: "15px", textTransform: "none" }}
              >
                Sign Up
              </Button>
            </Box>
          ) : (
            <>
              <Button
                id="logout"
                variant="contained"
                sx={{
                  fontSize: "15px",
                  mx: 1,
                  textTransform: "none",
                  backgroundColor: "#d32f2f",
                }}
                component={Link}
                to="/"
                onClick={() => {
                  removeToken();
                  clearPres();
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* Second Toolbar to avoid some part of the content invisible.
            From https://mui.com/material-ui/react-app-bar/#fixed-placement */}
      <Toolbar />
    </>
  );
}

export default Header;
