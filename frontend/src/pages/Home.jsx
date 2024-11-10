// src/pages/Home.jsx
import { Typography, Box } from '@mui/material';
// import welcomeImage from "../assets/welcome.png"

function Home() {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <Box
        component="img"
        src={"https://i.imgur.com/WMDh6CL.png"}
        alt="Welcome"
        sx={{
          width: '100%',
          height: '100vh',
          objectFit: 'cover', 
        }}
      />

      <Typography
        variant="h3"
        sx={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          padding: '10px 20px',
        }}
      >
        Welcome to our Website!
      </Typography>
    </Box>
  );
}
export default Home;
