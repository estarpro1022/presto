import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TitleIcon from "@mui/icons-material/Title";
import ImageIcon from "@mui/icons-material/Image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CodeIcon from "@mui/icons-material/Code";
import { red } from "@mui/material/colors";
import { PresentationContext } from "../context/PresentationContext";
import { putStore } from "../request";
import TextDialog from "../components/TextDialog";
import ImageDialog from "../components/ImageDialog";
import VideoDialog from "../components/VideoDialog";
import SyntaxHighlighter from "react-syntax-highlighter";
import CodeDialog from "../components/CodeDialog";
import YouTubePlayer from "../components/YoutubePlayer";

const theme = createTheme({
  palette: {
    secondary: {
      main: red[500],
    },
  },
});

function DeletePreDialog({ pre, toDeletePre, setToDeletePre }) {
  const { pres, setPres } = useContext(PresentationContext);
  const navigate = useNavigate();
  const onDelete = async () => {
    const newPres = pres.filter((p) => p.id !== pre.id);
    setPres(newPres);
    await putStore(newPres);
  };

  return (
    <Dialog open={toDeletePre} onClose={() => setToDeletePre(false)}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this presentation?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setToDeletePre(false)}>No</Button>
        <Button
          variant="contained"
          onClick={async () => {
            await onDelete();
            navigate("/dashboard");
          }}
          sx={{
            backgroundColor: red[500],
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function DeleteLastSlideDialog({ pre, open, setOpen }) {
  const { pres, setPres } = useContext(PresentationContext);
  const navigate = useNavigate();
  const onDelete = async () => {
    if (pre.slides.length === 1) {
      const newPres = pres.filter((p) => p.id !== pre.id);
      setPres(newPres);
      await putStore(newPres);
      navigate("/dashboard");
      console.log("hello, i'm from presentation to dashboard");
      return;
    }
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Delete the last slide will delete this presentation.
        </DialogContentText>
        <DialogContentText>Are you sure to continue?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>No</Button>
        <Button
          variant="contained"
          onClick={async () => {
            await onDelete();
          }}
          sx={{
            backgroundColor: red[500],
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function ModifyNameDialog({ pre, setPre, open, setOpen }) {
  const [error, setError] = useState(false);
  const [name, setName] = useState("");

  const closeDialog = () => {
    setOpen(false);
    setError(false);
  };

  const modify = () => {
    if (!name) {
      setError(true);
      return;
    }
    const updatePre = { ...pre, name: name };
    // const updatePres = pres.map((p) => (p.id === pre.id ? updatePre : p));
    setPre(updatePre);
    // setPres(updatePres);
    // putStore(updatePres);
    setError(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Modify Name</DialogTitle>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button onClick={modify} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function GoBackDialog({ open, onClose, onSave }) {
  const navigate = useNavigate();
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Confirm Saving</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to save this presentation?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            navigate(-1);
          }}
        >
          No
        </Button>
        <Button onClick={onSave} variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function UploadThumbnailDialog({ pre, setPre, open, setOpen }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState(false);
  const closeDialog = () => setOpen(false);
  const upload = () => {
    if (!thumbnail) {
      setError(true);
      return;
    }
    const updatePre = { ...pre, thumbnail: thumbnail };
    setPre(updatePre);
    setError(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="xs">
      <DialogTitle>Upload Thumbnail</DialogTitle>
      <DialogContent>
        <TextField
          id="thumbnail"
          autoFocus
          placeholder="e.g. https://i.imgur.com/NhyZlnJ.png"
          label="url"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          required
          fullWidth
          autoComplete="off"
          error={error}
          helperText={error ? "url can't be empty" : ""}
          margin="normal"
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button onClick={upload} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function SetBackgroundDialog({ pre, setPre, open, setOpen }) {
  const [backgroundType, setBackgroundType] = useState("solid");
  const [backgroundValue, setBackgroundValue] = useState("#ffffff");

  const saveBackground = () => {
    const updatePre = {
      ...pre,
      background: { type: backgroundType, value: backgroundValue },
    };
    setBackgroundType("solid");
    setBackgroundValue("#ffffff");
    setPre(updatePre);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setBackgroundType("solid");
    setBackgroundValue("#ffffff");
  };

  const handleBackgroundTypeChange = (event) => {
    setBackgroundType(event.target.value);
    setBackgroundValue("");
  };

  const handleBackgroundValueChange = (event) => {
    setBackgroundValue(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Set Slide Background</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel id="background-type-label">Background Type</InputLabel>
          <Select
            labelId="background-type-label"
            value={backgroundType}
            onChange={handleBackgroundTypeChange}
            label="Background Type"
          >
            <MenuItem value="solid">Solid Colour</MenuItem>
            <MenuItem value="gradient">Gradient</MenuItem>
            <MenuItem value="image">Image</MenuItem>
          </Select>
        </FormControl>

        {backgroundType === "solid" && (
          <TextField
            label="Solid Colour (Hex)"
            type="color"
            value={backgroundValue}
            onChange={handleBackgroundValueChange}
            fullWidth
            margin="normal"
          />
        )}

        {backgroundType === "gradient" && (
          <TextField
            label="Gradient CSS"
            placeholder="e.g., linear-gradient(to right, #ff7e5f, #feb47b)"
            value={backgroundValue}
            onChange={handleBackgroundValueChange}
            fullWidth
            margin="normal"
          />
        )}

        {backgroundType === "image" && (
          <TextField
            label="Image URL"
            placeholder="e.g. https://i.imgur.com/yBReAgV.png"
            value={backgroundValue}
            onChange={handleBackgroundValueChange}
            fullWidth
            margin="normal"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={saveBackground} variant="contained">
          Apply Background
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function Slide({ pre, setPre, current, setCurrent, props }) {
  const { modifyName, uploadThumbnail, background } = props;
  const elements = pre.slides[current];
  const slides = pre.slides;

  const [addText, setAddText] = useState(false);
  const [editText, setEditText] = useState(false);
  const [addImage, setAddImage] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [addVideo, setAddVideo] = useState(false);
  const [editVideo, setEditVideo] = useState(false);
  const [addCode, setAddCode] = useState(false);
  const [editCode, setEditCode] = useState(false);

  const [clickTimeout, setClickTimeout] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        if (current !== 0) {
          setCurrent(current - 1);
        }
      } else if (event.key === "ArrowRight") {
        if (current !== slides.length - 1) {
          setCurrent(current + 1);
        }
      }
    };

    if (
      !addText &&
      !editText &&
      !addImage &&
      !editImage &&
      !addVideo &&
      !editVideo &&
      !addCode &&
      !editCode &&
      !modifyName &&
      !uploadThumbnail &&
      !background
    ) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    current,
    setCurrent,
    slides.length,
    addText,
    editText,
    addImage,
    editImage,
    addVideo,
    editVideo,
    addCode,
    editCode,
    modifyName,
    uploadThumbnail,
    background,
  ]);

  // 双击
  const handleClick = (event, element, onDoubleClick) => {
    if (clickTimeout) {
      // 双击发生在500ms内
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      onDoubleClick(event, element);
    } else {
      // 设置一个500ms的计时器来等待下次点击
      const timeout = setTimeout(() => {
        setClickTimeout(null);
      }, 500);
      setClickTimeout(timeout);
    }
  };

  // 删除selectedElement
  const handleDelete = () => {
    const newElements = elements.filter((e) => e.id !== selectedElement.id);
    const newPre = {
      ...pre,
      slides: pre.slides.map((s, i) => (i === current ? newElements : s)),
    };
    // const newPres = pres.map((p) => (p.id === pre.id ? newPre : p));
    setPre(newPre);
    // setPres(newPres);
    setMenuAnchor(null);
    // putStore(newPres);
  };

  const getBackgroundStyle = () => {
    const appliedBackground = pre.background || {
      type: "solid",
      value: "#ffffff",
    };
    switch (appliedBackground.type) {
      case "solid":
        return { backgroundColor: appliedBackground.value };
      case "gradient":
        return { backgroundImage: appliedBackground.value };
      case "image":
        return {
          backgroundImage: `url(${appliedBackground.value})`,
          backgroundSize: "cover",
        };
      default:
        return { backgroundColor: "#ffffff" };
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "row", mt: 1 }}
    >
      {/* 元素icon */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <IconButton onClick={() => setAddText(true)}>
          <TitleIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => setAddImage(true)}>
          <ImageIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => setAddVideo(true)}>
          <YouTubeIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => setAddCode(true)}>
          <CodeIcon fontSize="large" />
        </IconButton>
      </Box>
      <Paper
        sx={{
          width: "100%",
          height: "80vh",
          position: "relative",
          marginRight: 1,
          ...getBackgroundStyle(),
        }}
      >
        {elements.map((element) => {
          if (element.type === "text") {
            // 文字元素
            return (
              <Box
                key={element.id}
                sx={{
                  position: "absolute",
                  top: `${element.position.y}%`,
                  left: `${element.position.x}%`,
                  width: `${element.size.width}%`,
                  height: `${element.size.height}%`,
                  fontSize: `${element.fontSize}em`,
                  color: `${element.color}`,
                  zIndex: element.layer,
                  border: "1px solid lightgrey",
                  overflow: "hidden",
                }}
                onClick={(e) =>
                  handleClick(e, element, (e, element) => {
                    e.preventDefault();
                    setSelectedElement(element);
                    setEditText(true);
                  })
                }
                onContextMenu={(e) => {
                  e.preventDefault();
                  setSelectedElement(element);
                  setMenuAnchor(e.currentTarget);
                }}
              >
                <Typography sx={{ fontFamily: pre.fontFamily }}>
                  {element.text}
                </Typography>
                {/* {element.text} */}
              </Box>
            );
          } else if (element.type === "image") {
            const src = element.url ? element.url : element.base64;
            return (
              <Box
                key={element.id}
                component="img"
                src={src}
                alt={element.alt}
                sx={{
                  position: "absolute",
                  top: `${element.position.y}%`,
                  left: `${element.position.x}%`,
                  width: `${element.size.width}%`,
                  height: `${element.size.height}%`,
                  zIndex: element.layer,
                }}
                onClick={(e) => {
                  handleClick(e, element, (e, element) => {
                    e.preventDefault();
                    setSelectedElement(element);
                    setEditImage(true);
                  });
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setSelectedElement(element);
                  setMenuAnchor(e.currentTarget);
                }}
              ></Box>
            );
          } else if (element.type === "video") {
            return (
              <Box
                key={element.id}
                style={{
                  position: "absolute",
                  top: `${element.position.y}%`,
                  left: `${element.position.x}%`,
                  height: `${element.size.height}%`,
                  width: `${element.size.width}%`,
                  zIndex: element.layer,
                  border: "1px dashed gray",
                  margin: "16px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  handleClick(e, element, (e, element) => {
                    e.preventDefault();
                    setSelectedElement(element);
                    setEditVideo(true);
                  });
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setSelectedElement(element);
                  setMenuAnchor(e.currentTarget);
                }}
              >
                <YouTubePlayer
                  videoUrl={element.url}
                  autoPlay={element.autoplay}
                />
                {/* <video
                  controls
                  width="100%"
                  height="100%"
                  autoPlay={element.autoplay}
                  src={element.url}
                  style={{ display: "block" }}
                /> */}
              </Box>
            );
          } else if (element.type === "code") {
            return (
              <Box
                key={element.id}
                sx={{
                  position: "absolute",
                  top: `${element.position.y}%`,
                  left: `${element.position.x}%`,
                  width: `${element.size.width}%`,
                  height: `${element.size.height}%`,
                  fontSize: `${element.fontSize}em`,
                  zIndex: element.layer,
                  border: "1px solid lightgrey",
                  overflow: "hidden",
                }}
                onClick={(e) => {
                  handleClick(e, element, (e, element) => {
                    e.preventDefault();
                    setSelectedElement(element);
                    setEditCode(true);
                  });
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setSelectedElement(element);
                  setMenuAnchor(e.currentTarget);
                }}
              >
                <SyntaxHighlighter
                  language={element.language}
                  style={dracula}
                  showLineNumbers
                  customStyle={{
                    height: "100%",
                    width: "100%",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {element.code}
                </SyntaxHighlighter>
              </Box>
            );
          }
        })}
      </Paper>

      {/* 右键Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{ vertical: "center", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {/* Menu item for deleting an item */}
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      {/* 文字Dialog */}
      <TextDialog
        open={addText || editText}
        edit={editText}
        {...(editText ? { props: selectedElement } : {})}
        onClose={() => {
          setAddText(false);
          setEditText(false);
        }}
        onSave={async (data) => {
          data.layer = elements.length;
          const fontFamily = data.fontFamily || pre.fontFamily;
          delete data.fontFamily;
          if (addText) {
            // 添加文字
            // elements是单张幻灯片的所有内容
            elements.push(data);
            const newPre = {
              ...pre,
              fontFamily,
              slides: pre.slides.map((slide, index) =>
                index === current ? elements : slide
              ),
            };
            setPre(newPre);
            // setPres(pres.map((p) => (p.id === pre.id ? newPre : p)));
            // await putStore(pres);
          } else {
            console.log("edit text");

            // 编辑文字
            // not element.id === data.id, because id is Date.now()
            const newElements = elements.map((element) =>
              element.id === selectedElement.id ? data : element
            );
            console.log("new elements:", newElements);

            const newPre = {
              ...pre,
              fontFamily,
              slides: pre.slides.map((slide, index) =>
                index === current ? newElements : slide
              ),
            };
            // const newPres = pres.map((p) => (p.id === pre.id ? newPre : p));
            console.log("new pre", newPre);

            setPre(newPre);
            // setPres(newPres);

            // await putStore(newPres);
          }
        }}
      />

      {/* 图片Dialog */}
      <ImageDialog
        open={addImage || editImage}
        edit={editImage}
        {...(editImage ? { props: selectedElement } : {})}
        onClose={() => {
          setAddImage(false);
          setEditImage(false);
        }}
        onSave={async (data) => {
          data.layer = elements.length;
          console.log("i've added image:", data);
          if (addImage) {
            elements.push(data);
            const newPre = {
              ...pre,
              slides: pre.slides.map((slide, index) =>
                index === current ? elements : slide
              ),
            };
            setPre(newPre);
          } else {
            const newElements = elements.map((element) =>
              element.id === selectedElement.id ? data : element
            );
            const newPre = {
              ...pre,
              slides: pre.slides.map((slide, index) =>
                index === current ? newElements : slide
              ),
            };
            setPre(newPre);
          }
        }}
      />

      {/* VideoDialog */}

      <VideoDialog
        open={addVideo || editVideo}
        edit={editVideo}
        {...(editVideo ? { props: selectedElement } : {})}
        onClose={() => {
          setAddVideo(false);
          setEditVideo(false);
        }}
        onSave={async (data) => {
          data.layer = elements.length;
          console.log("i've added video:", data);
          if (addVideo) {
            elements.push(data);
            const newPre = {
              ...pre,
              slides: pre.slides.map((slide, index) =>
                index === current ? elements : slide
              ),
            };
            setPre(newPre);
          } else {
            const newElements = elements.map((element) =>
              element.id === selectedElement.id ? data : element
            );
            const newPre = {
              ...pre,
              slides: pre.slides.map((slide, index) =>
                index === current ? newElements : slide
              ),
            };
            setPre(newPre);
          }
        }}
      />

      {/* 代码块 */}
      <CodeDialog
        open={addCode || editCode}
        edit={editCode}
        {...(editCode ? { props: selectedElement } : {})}
        onClose={() => {
          setAddCode(false);
          setEditCode(false);
        }}
        onSave={async (data) => {
          data.layer = elements.length;
          console.log("i've added code:", data);
          if (addCode) {
            elements.push(data);
            const newPre = {
              ...pre,
              slides: pre.slides.map((slide, index) =>
                index === current ? elements : slide
              ),
            };
            setPre(newPre);
          } else {
            const newElements = elements.map((element) =>
              element.id === selectedElement.id ? data : element
            );
            const newPre = {
              ...pre,
              slides: pre.slides.map((slide, index) =>
                index === current ? newElements : slide
              ),
            };
            setPre(newPre);
          }
        }}
      />
    </Container>
  );
}

export default function Presentation() {
  const { pres, setPres } = useContext(PresentationContext);
  const [pre, setPre] = useState(JSON.parse(sessionStorage.getItem("pre")));
  const navigate = useNavigate();
  const [toDeletePre, setToDeletePre] = useState(false);
  const [toDeleteSlide, setToDeleteSlide] = useState(false);
  const [modifyName, setModifyName] = useState(false);
  const [current, setCurrent] = useState(0);
  const [goBack, setGoBack] = useState(false);
  const [uploadThumbnail, setUploadThumbnail] = useState(false);
  const [background, setBackground] = useState(false);
  const [preview, setPreview] = useState(false);
  const slides = pre?.slides;

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/");
    }
  });

  const savePre = (updatedPre) => {
    sessionStorage.setItem("pre", JSON.stringify(updatedPre));
    const newPres = pres.map((p) => (p.id === updatedPre.id ? updatedPre : p));
    setPres(newPres);
    putStore(newPres);
  };

  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <DeletePreDialog
        pre={pre}
        toDeletePre={toDeletePre}
        setToDeletePre={setToDeletePre}
      />
      <DeleteLastSlideDialog
        pre={pre}
        open={toDeleteSlide}
        setOpen={setToDeleteSlide}
      />
      <ModifyNameDialog
        pre={pre}
        setPre={setPre}
        open={modifyName}
        setOpen={setModifyName}
      />
      <GoBackDialog
        open={goBack}
        onClose={() => setGoBack(false)}
        onSave={() => {
          savePre(pre);
          navigate(-1);
        }}
      />
      <UploadThumbnailDialog
        open={uploadThumbnail}
        setOpen={setUploadThumbnail}
        pre={pre}
        setPre={setPre}
      />
      <SetBackgroundDialog
        open={background}
        setOpen={setBackground}
        pre={pre}
        setPre={setPre}
      />
      <Box width="100%" display={"flex"} alignItems={"center"}>
        <Tooltip title="back">
          <IconButton onClick={() => setGoBack(true)}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="delete this presentation">
          <IconButton
            id="delete-pre"
            onClick={() => {
              setToDeletePre(true);
            }}
            sx={{
              "&:hover": {
                color: red[500],
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="upload thumbnail">
          <IconButton
            onClick={() => setUploadThumbnail(true)}
            id="upload-thumbnail"
          >
            <CloudUploadIcon />
          </IconButton>
        </Tooltip>
        <Typography
          sx={{
            fontWeight: "bold",
            ml: { xs: 1, md: 5 },
            fontSize: { xs: 18, sm: 32 },
          }}
          color="#455a64"
        >
          {pre.name}
        </Typography>
        <Tooltip title="modify name">
          <IconButton onClick={() => setModifyName(true)} id="modify-name">
            <ModeEditIcon />
          </IconButton>
        </Tooltip>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderWidth: 1, mx: { sm: 1 } }}
        />
        <Tooltip title="set background">
          <IconButton onClick={() => setBackground(true)}>
            <WallpaperIcon />
          </IconButton>
        </Tooltip>

        {/* 保存按钮 */}
        <Tooltip title="save presentation">
          <Fab
            variant="extended"
            color="primary"
            sx={{
              position: "absolute",
              right: 10,
              height: { xs: 32, sm: 40 },
            }}
            onClick={() => savePre(pre)}
          >
            <SaveIcon sx={{ mr: { sm: 1 } }} />
            Save
          </Fab>
        </Tooltip>
      </Box>

      {/* 画布 */}
      <Slide
        pre={pre}
        setPre={setPre}
        current={current}
        setCurrent={setCurrent}
        props={{
          modifyName,
          uploadThumbnail,
          background,
        }}
      />

      {/* 左箭头 */}
      <IconButton
        id="left-arrow"
        sx={{ position: "absolute", bottom: "50%", left: 0 }}
        disabled={current <= 0}
        onClick={() => setCurrent(current - 1)}
      >
        <ArrowBackIosIcon />
      </IconButton>

      {/* 右箭头 */}
      <IconButton
        id="right-arrow"
        sx={{ position: "absolute", bottom: "50%", right: 0 }}
        disabled={current >= slides.length - 1}
        onClick={() => setCurrent(current + 1)}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* 删除幻灯片 */}
      <ThemeProvider theme={theme}>
        <Tooltip title="delete this slide" placement="left">
          <Fab
            id="delete-slide"
            color="secondary"
            sx={{
              position: "absolute",
              bottom: { xs: 96, sm: 108 },
              right: { xs: 0, sm: 32 },
            }}
            onClick={async () => {
              if (pre.slides.length > 1) {
                const newPres = pres.map((p) => {
                  if (p.id === pre.id) {
                    return {
                      ...p,
                      slides: p.slides.filter((s, i) => i !== current),
                    };
                  }
                  return p;
                });
                setPre(newPres.find((p) => p.id === pre.id));
                // setPres(newPres);
                setCurrent(current === 0 ? 0 : current - 1);
                // await putStore(newPres);
                return;
              } else {
                setToDeleteSlide(true);
              }
            }}
          >
            <DeleteForeverIcon />
          </Fab>
        </Tooltip>
      </ThemeProvider>

      {/* 创建幻灯片 */}
      <Tooltip title="create new slide" placement="left">
        <Fab
          color="primary"
          sx={{
            position: "absolute",
            bottom: { xs: 16, sm: 32 },
            right: { xs: 0, sm: 32 },
          }}
          onClick={() => {
            const newPre = { ...pre, slides: [...slides, []] };
            setPre(newPre);
            console.log("create a new slide");
          }}
          id="create-slide"
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      {/* 预览 */}
      <IconButton
        sx={{
          position: "absolute",
          bottom: 80,
          left: 24,
        }}
        onClick={() => {
          // navigate(`/presentation/${pre.id}/preview`, {
          //   state: {
          //     pre
          //   }
          // });
          setPreview(true);
        }}
      >
        <VisibilityIcon />
      </IconButton>

      <Dialog open={preview} onClose={() => setPreview(false)} fullWidth>
        <DialogTitle>Save before Preview</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please click the right top save button first, or you will lose
            current data
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreview(false)}>OK, I will do that</Button>
          <Button
            onClick={() => {
              navigate(`/presentation/${pre.id}/preview`, {
                state: {
                  pre,
                },
              });
            }}
            variant="contained"
          >
            Already Save!
          </Button>
        </DialogActions>
      </Dialog>

      {/* 幻灯片数字 */}
      <Box
        sx={{
          position: "absolute",
          bottom: 32,
          left: 32,
          width: 50,
          height: 50,
        }}
      >
        <Typography
          sx={{
            fontSize: "1em",
            fontWeight: "bold",
          }}
        >
          {current + 1}th
        </Typography>
      </Box>
    </Box>
  );
}
