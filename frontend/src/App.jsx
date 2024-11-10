// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Box from "@mui/material/Box";
import Header from "./header";
import Presentation from "./pages/Presentation";
import Preview from "./pages/Preview";

function App() {
  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/presentation/:id" element={<Presentation />} />
        <Route path="/presentation/:id/preview" element={<Preview />} />
      </Routes>
    </Box>
  );
}

export default App;
