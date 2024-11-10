import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  ListItemButton,
  TextField,
  Toolbar,
} from "@mui/material";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid2";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import PreCard from "../components/PreCard";
import { putStore } from "../request";
import { PresentationContext } from "../context/PresentationContext";
import { useNavigate } from "react-router-dom";

function DashboardSidebar({ pres, setPres }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/");
    }
  });

  const closeDialog = () => {
    setOpen(false);
    setError(false);
  };

  const create = () => {
    console.log("pre name:", name);
    if (!name) {
      setError(true);
      return;
    }
    const pre = {
      id: pres.length,
      name: name,
      description: description,
      thumbnail: null,
      slides: [[]], // empty slide
    };
    const newPres = [pre, ...pres];
    setPres(newPres);
    setOpen(false);

    putStore(newPres);
  };
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: { xs: 180, sm: 240 },
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: { xs: 180, sm: 240 },
          boxSizing: "border-box",
        },
      }}
    >
      {/* 添加一个 Toolbar 占位符，使得 Drawer 在 AppBar 下方对齐 */}
      <Toolbar />

      {/* Dialog */}
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Create New Presentations</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            id="name"
            autoFocus
            label="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="off"
            error={error}
            helperText={error ? "name can't be empty" : ""}
            margin="normal"
          ></TextField>
          <TextField
            id="description"
            label="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            margin="normal"
            autoComplete="off"
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={create} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Sidebar */}
      <List>
        <ListItem>
          <AccountCircleIcon fontSize="large" />
          <ListItemText
            primary="Welcome"
            primaryTypographyProps={{ fontSize: 20 }}
            sx={{ textAlign: "center" }}
          />
        </ListItem>
        <ListItem disablePadding sx={{ my: 1 }}>
          <Fab
            color="primary"
            variant="extended"
            sx={{ mx: "auto", px: 3 }}
            onClick={() => {
              setOpen(true);
              setName("");
              setDescription("");
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            New
          </Fab>
        </ListItem>
        <Divider />
        <ListItem disablePadding sx={{ mt: 1 }}>
          <ListItemButton>
            <ListItemText
              primary="My Presentations"
              sx={{ textAlign: "center" }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

function Board({ pres }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {pres.map((item) => (
          <Grid key={item.id} size={{ xs: 12, md: 4, lg: 4 }}>
            <PreCard pre={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default function Dashboard() {
  const { pres, setPres } = useContext(PresentationContext);
  return (
    <Box sx={{ display: "flex" }}>
      <DashboardSidebar pres={pres} setPres={setPres} />
      <Board pres={pres} />
    </Box>
  );
}
