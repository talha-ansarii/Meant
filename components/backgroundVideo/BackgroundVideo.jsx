import React from 'react';
import './BackgroundVideo.css'; // Import the CSS file for styling

const BackgroundVideo = () => {
  return (
    <div className="video-background overflow-hidden">
      <video autoPlay loop muted className="video">
        <source src={"/rays.avi"} type="video/avi" />
        Your browser does not support the video tag.
      </video>
     
    </div>
  );
};

export default BackgroundVideo;
