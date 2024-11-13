import { useEffect, useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSpring, animated } from "@react-spring/web";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLocation, useNavigate } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import YouTubePlayer from "../components/YoutubePlayer";

export default function Preview() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pre] = useState(location.state?.pre);
  const [current, setCurrent] = useState(0);
  const elements = pre.slides[current];
  const slides = pre.slides;

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

  const [slideProps, setAnimation] = useSpring(() => ({
    transform: "translateX(0%)",
    opacity: 1,
    config: { tension: 300, friction: 30 },
  }));

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        console.log("arrow left");

        if (current !== 0) {
          console.log("enter left");
          
          setAnimation({ transform: "translateX(100%)", opacity: 0 });
          setTimeout(() => {
            setAnimation({
              transform: "translateX(-100%)",
              opacity: 0,
              immediate: true,
            });
            setCurrent(current - 1);
            setAnimation({ transform: "translateX(0%)", opacity: 1 });
          }, 300);
        }
      } else if (event.key === "ArrowRight") {
        console.log("arrow right");

        if (current !== slides.length - 1) {
          setAnimation({ transform: "translateX(-100%)", opacity: 0 });
          setTimeout(() => {
            setAnimation({
              transform: "translateX(100%)",
              opacity: 0,
              immediate: true,
            });
            setCurrent(current + 1);
            setAnimation({ transform: "translateX(0%)", opacity: 1 });
          }, 300);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [current, setCurrent, slides.length]);

  return (
    <Box sx={{ flexGrow: 1, height: "100%", overflow: "hidden" }}>
      <Box width="100%" display={"flex"} alignItems={"center"}>
        <Tooltip title="back">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Container maxWidth="xl" style={{ overflow: "hidden" }}>
        <animated.div style={{ ...slideProps }}>
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
                // text element
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
                      overflow: "hidden",
                    }}
                  >
                    <Typography sx={{ fontFamily: element.fontFamily }}>
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
                      margin: "16px",
                      cursor: "pointer",
                    }}
                  >
                    <YouTubePlayer
                      videoUrl={element.url}
                      autoPlay={element.autoplay}
                    />
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
                      overflow: "hidden",
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
        </animated.div>
      </Container>

      {/* Left Arrow */}
      <IconButton
        sx={{ position: "absolute", bottom: "50%", left: { xs: -5, md: 0 } }}
        disabled={current <= 0}
        onClick={() => {
          if (current !== 0) {
            setAnimation({ transform: "translateX(100%)", opacity: 0 });
            setTimeout(() => {
              setAnimation({
                transform: "translateX(-100%)",
                opacity: 0,
                immediate: true,
              });
              setCurrent(current - 1);
              setAnimation({ transform: "translateX(0%)", opacity: 1 });
            }, 300);
          }
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      {/* Right Arrow */}
      <IconButton
        sx={{ position: "absolute", bottom: "50%", right: { xs: -5, md: 0 } }}
        disabled={current >= slides.length - 1}
        onClick={() => {
          if (current !== slides.length - 1) {
            setAnimation({ transform: "translateX(-100%)", opacity: 0 });
            setTimeout(() => {
              setAnimation({
                transform: "translateX(100%)",
                opacity: 0,
                immediate: true,
              });
              setCurrent(current + 1);
              setAnimation({ transform: "translateX(0%)", opacity: 1 });
            }, 300);
          }
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}
