import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

const CodeDialog = ({
  open,
  onClose,
  onSave,
  edit = false,
  props = {
    size: { width: 30, height: 30 },
    code: "",
    fontSize: 1.0,
    language: "c",
    position: { x: 0, y: 0 },
  },
}) => {
  const [size, setSize] = useState(props.size);
  const [code, setCode] = useState(props.code);
  const [fontSize, setFontSize] = useState(props.fontSize);
  const [, setLanguage] = useState(props.language);
  const [position, setPosition] = useState(props.position);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (edit) {
      setSize(props.size);
      setCode(props.code);
      setFontSize(props.fontSize);
      setLanguage(props.language);
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

  const identify = (codeSnippet) => {
    if (codeSnippet.includes('#include') || codeSnippet.includes('int main')) {
      return 'c';
    } else if (codeSnippet.includes('import') || codeSnippet.includes('def ')) {
      return 'python';
    } else {
      return 'javascript';
    }
  };

  const handleClose = () => {
    onClose();
    setSize({ width: 30, height: 30 });
    setCode("");
    setFontSize(1.0);
    setLanguage("c");
    setPosition({ x: 0, y: 0 });
    setError(false);
  };

  const handleSave = () => {
    if (!code) {
      setError(true);
      return;
    }
    const language = identify(code);
    console.log("language is", language);
    const data = {
      id: Date.now(),
      type: "code",
      size: { ...size },
      code: code,
      fontSize,
      language: language,
      position: { ...position },
    };
    console.log("save data:", data);

    onSave(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{edit ? "Edit Code Block" : "Add Code Block"}</DialogTitle>
      <DialogContent>
        {/* Code Block Size */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            label="Width (%)"
            value={size.width}
            onChange={(e) => handleSizeChange(e, "width")}
            type="number"
            fullWidth
          />
          <TextField
            label="Height (%)"
            value={size.height}
            onChange={(e) => handleSizeChange(e, "height")}
            type="number"
            fullWidth
          />
        </Box>

        {/* Code Block */}
        <TextField
          label="Code Block"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          multiline
          minRows={3}
          fullWidth
          error={error}
          helperText={
            error ? "Please enter the code such as c, python or javascript" : ""
          }
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
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CodeDialog;
