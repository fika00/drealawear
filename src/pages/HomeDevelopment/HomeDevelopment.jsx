import "./HomeDevelopment.scss";

import { useRef, useState } from "react";
import HomeDevHud from "./HomeDevHud/HomeDevHud";
import { motion } from "framer-motion";

const BottomHud = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
        delay: 2,
      }}
      className="homedevelopment-container-bottomhud"
    >
      <h2 className="homedevelopment-container-bottomhud-text ">
        Follow socials for more info.
      </h2>
    </motion.div>
  );
};

const HomeDevelopment = () => {
  const [isReady, setIsReady] = useState(false);

  const onReadyHandler = () => {
    setIsReady(true);
  };
  return (
    <div className="homedevelopment-container">
      <video
        onCanPlay={onReadyHandler}
        className={`homedevelopment-container-video ${
          isReady ? "homedevelopment-container-video-ready" : ""
        }`}
        src="landingVideo.webm"
        autoPlay
        muted
        playsInline
        loop
      />
      <HomeDevHud />
      <BottomHud />
    </div>
  );
};

export default HomeDevelopment;
