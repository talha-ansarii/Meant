import React from "react";

const VideoLoader = () => (
  <div className="video-loader">
    <video autoPlay loop muted>
      <source src="/loader.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
);

export default VideoLoader;
