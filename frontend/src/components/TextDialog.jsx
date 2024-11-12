import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const TextDialog = ({
  open,
  onClose,
  onSave,
  edit = false,
  props = {
    size: { width: 10, height: 10 },
    text: "",
    fontSize: 1.0,
    color: "#000000",
    fontFamily: "Roboto",
    position: { x: 0, y: 0 },
  },
}) => {
  const [textAreaSize, setTextAreaSize] = useState(props.size);
  const [textContent, setTextContent] = useState(props.text);
  const [fontSize, setFontSize] = useState(props.fontSize);
  const [textColor, setTextColor] = useState(props.color);
  const [position, setPosition] = useState(props.position);
  const [fontFamily, setFontFamily] = useState(props.fontFamily);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (edit) {
      setTextAreaSize(props.size);
      setTextContent(props.text);
      setFontSize(props.fontSize);
      setTextColor(props.color);
      setFontFamily(props.fontFamily);
      setPosition(props.position);
    }
  }, [edit, props]);

  const handleSizeChange = (e, type) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value) || 0));
    setTextAreaSize({ ...textAreaSize, [type]: value });
  };

  const handlePositionChange = (e, type) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value) || 0));
    setPosition({ ...position, [type]: value });
  };

  const handleClose = () => {
    onClose();
    setTextAreaSize({ width: 10, height: 10 });
    setTextContent("");
    setFontSize(1.0);
    setTextColor("#000000");
    setPosition({ x: 0, y: 0 });
    setFontFamily("Roboto");
    setError(false);
  };
  const handleSave = () => {
    if (!textContent) {
      setError(true);
      return;
    }
    const data = {
      id: Date.now(),
      type: "text",
      size: { ...textAreaSize },
      text: textContent,
      fontSize,
      color: textColor,
      position: { ...position },
    };
    if (edit) {
      data.fontFamily = fontFamily;
    }
    console.log("save data:", data);

    onSave(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{edit ? "Edit Text" : "Add Text"}</DialogTitle>
      <DialogContent>
        {/* Text Area Size */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            label="Width (%)"
            value={textAreaSize.width}
            onChange={(e) => handleSizeChange(e, "width")}
            type="number"
            fullWidth
          />
          <TextField
            label="Height (%)"
            value={textAreaSize.height}
            onChange={(e) => handleSizeChange(e, "height")}
            type="number"
            fullWidth
          />
        </Box>

        {/* Text Content */}
        <TextField
          label="Text Content"
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          multiline
          minRows={3}
          fullWidth
          error={error}
          helperText={error ? "Please enter text content" : ""}
          margin="normal"
        />

        {/* Font Size */}
        <TextField
          label="Font Size (em)"
          value={fontSize}
          onChange={(e) => setFontSize(parseFloat(e.target.value) || 0)}
          type="number"
          fullWidth
          margin="normal"
        />

        {/* Text Color */}
        <TextField
          label="Text Color (HEX)"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          type="text"
          fullWidth
          margin="normal"
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
            <FormControl fullWidth margin="normal">
              <InputLabel id="font-family-label">Font Family</InputLabel>
              <Select
                labelId="font-family-label"
                id="font-family-select"
                value={fontFamily}
                label="Font Family"
                onChange={(e) => setFontFamily(e.target.value)}
              >
                <MenuItem value="Roboto">Roboto</MenuItem>
                <MenuItem value="Arial">Arial</MenuItem>
                <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                <MenuItem value="Courier New">Courier New</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TextDialog;
