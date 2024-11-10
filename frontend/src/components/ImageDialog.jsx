import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Input,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";

export default function ImageDialog({
  open,
  onClose,
  onSave,
  edit = false,
  props = {
    size: { width: 10, height: 10 },
    url: "",
    alt: "",
    base64: "",
    position: { x: 0, y: 0 },
  },
}) {
  const [size, setSize] = useState(props.size);
  const [url, setUrl] = useState(props.url);
  const [base64, setBase64] = useState(props.base64);
  const [alt, setAlt] = useState(props.alt);
  const [useUrl, setUseUrl] = useState(true);
  const [position, setPosition] = useState(props.position);

  useEffect(() => {
    if (edit) {
      setSize(props.size);
      setUrl(props.url);
      setBase64(props.base64);
      setAlt(props.alt);
      setUseUrl(props.url ? true : false);
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setBase64(reader.result);
          setUrl("");
        } else {
          console.error("FileReader result is not a string");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Submission logic, handle image size, URL/base64 encoding, and `alt` description
    // TODO
    const data = {
      id: Date.now(),
      type: "image",
      size: { ...size },
      url: url,
      base64: base64,
      alt: alt,
      position: { ...position },
    };

    onSave(data);
    handleClose();
  };

  const handleClose = () => {
    onClose();

    setSize({ width: 10, height: 10 });
    setUrl("");
    setBase64("");
    setAlt("");
    setUseUrl(true);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Enter Image Information</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide the relevant image information.
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
        <FormControlLabel
          control={
            <Checkbox
              checked={useUrl}
              onChange={(e) => setUseUrl(e.target.checked)}
              color="primary"
            />
          }
          label="Use Image URL"
        />
        {useUrl ? (
          <TextField
            margin="dense"
            label="Image URL"
            type="url"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        ) : (
          <>
            <Input
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={handleFileChange}
            />
            {base64 && <img src={base64} alt="uploaded image" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
          </>
        )}
        <TextField
          margin="dense"
          label="Image Description (alt)"
          type="text"
          fullWidth
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
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
