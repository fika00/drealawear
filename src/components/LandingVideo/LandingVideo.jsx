import { useEffect, useState } from "react";
import "./LandingVideo.scss";

const LandingVideo = () => {
  const [isReady, setIsReady] = useState(false);

  const onReadyHandler = () => {
    setIsReady(true);
  };

  return (
    <div className="landingvideo-container">
      <video
        onCanPlay={onReadyHandler}
        className={`landingvideo-container-video ${
          isReady ? "landingvideo-container-video-ready" : ""
        }`}
        src="landingVideo.webm"
        autoPlay
        muted
        playsInline
        loop
      />
    </div>
  );
};

export default LandingVideo;
