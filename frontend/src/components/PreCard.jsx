import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import Grey from "../assets/grey.png";
import { useNavigate } from "react-router-dom";

export default function PreCard({ pre }) {
  const navigate = useNavigate();

  return (
    <CardActionArea
      onClick={() => {
        sessionStorage.setItem("pre", JSON.stringify(pre));
        navigate(`/presentation/${pre.id}`)
      }}
    >
      <Card sx={{ minWidth: 100, aspectRatio: "2/1" }}>
        <CardMedia
          component="img"
          alt="thumbnail"
          image={pre.thumbnail || Grey}
          sx={{
            height: { xs: 50, sm: 120}
          }}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {pre.name}
          </Typography>
          <Typography
            variant="body1"
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
            sx={{
              color: "text.secondary",
            }}
          >
            {pre.description || "empty description..."}
          </Typography>
          <Typography
            variant="body2"
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
            }}
          >
            {pre.slides.length} slides
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
