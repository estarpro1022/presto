const YouTubePlayer = ({ videoUrl, autoPlay }) => {
  const autoplayParam = autoPlay ? "&autoplay=1" : ""; // Check if autoplay is enabled
  const videoEmbedUrl = `${videoUrl}${autoplayParam}`;

  return (
    <iframe
      width="80%"
      height="80%"
      src={videoEmbedUrl}
      title="YouTube video player"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  );
};

export default YouTubePlayer;
