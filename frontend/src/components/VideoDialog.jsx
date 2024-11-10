import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";

export default function VideoDialog({
  open,
  onClose,
  onSave,
  edit = false,
  props = {
    size: { width: 50, height: 50 },
    url: "",
    autoplay: false,
    position: { x: 0, y: 0 },
  },
}) {
  const [size, setSize] = useState(props.size);
  const [url, setUrl] = useState(props.url);
  const [autoplay, setAutoplay] = useState(props.autoplay);
  const [position, setPosition] = useState(props.position);

  useEffect(() => {
    if (edit) {
      setSize(props.size);
      setUrl(props.url);
      setAutoplay(props.autoplay);
      setPosition(props.position);
    }
  }, [edit, props]);

  const handleSizeChange = (e, type) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value) || 0));
    setSize({ ...size, [type]: value });
  };

  const handlePositionChange = (e, type) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value) || 0));
    setPosition({ ...position, [type]: value });
  };

  const handleSubmit = () => {
    // Submission logic, handle image size, URL/base64 encoding, and `alt` description
    const data = {
      id: Date.now(),
      type: "video",
      size: { ...size },
      url: url,
      autoplay: autoplay,
      position: { ...position },
    };

    onSave(data);
    handleClose();
  };

  const handleClose = () => {
    onClose();

    setSize({ width: 50, height: 50 });
    setUrl("");
    setAutoplay(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Enter Video Information</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide the relevant video information.
        </DialogContentText>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            autoFocus
            label="Width (%)"
            type="number"
            fullWidth
            value={size.width}
            onChange={(e) => handleSizeChange(e, "width")}
          />
          <TextField
            label="Height (%)"
            type="number"
            fullWidth
            value={size.height}
            onChange={(e) => handleSizeChange(e, "height")}
          />
        </Box>
        <TextField
          margin="dense"
          label="Video URL"
          type="url"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <FormControlLabel
          label="autoplay"
          control={
            <Checkbox
              checked={autoplay}
              onChange={(e) => setAutoplay(e.target.checked)}
            />
          }
        />

        {edit && (
          <>
            <TextField
              label="Position X (%)"
              value={position.x}
              onChange={(e) => handlePositionChange(e, "x")}
              type="number"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Position Y (%)"
              value={position.y}
              onChange={(e) => handlePositionChange(e, "y")}
              type="number"
              fullWidth
              margin="normal"
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
