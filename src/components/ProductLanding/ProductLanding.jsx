import { useEffect, useState } from "react";
import "./ProductLanding.scss";

import { AnimatePresence, cubicBezier, motion } from "framer-motion";

const BackgroundMedia = ({ images, currentImage }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const cubicEase = cubicBezier(0.49, -0.01, 0.35, 1);

  const animateState = {
    initial: {
      y: 20,
      opacity: 0,
      filter: "blur(10px)",
    },
    loaded: {
      y: 0,
      opacity: 1,
      filter: "blur(0)",
    },
  };

  return (
    <AnimatePresence>
      <motion.img
        onLoadStart={() => setIsLoaded(false)}
        onLoad={() => setIsLoaded(true)}
        key={currentImage}
        initial={{
          y: 20,
          opacity: 0,
          filter: "blur(10px)",
        }}
        animate={!isLoaded ? animateState.initial : animateState.loaded}
        exit={{
          opacity: 0,
          y: -20,

          filter: "blur(10px)",
        }}
        transition={{
          duration: 0.75,
          ease: cubicEase,
        }}
        className="productlanding-container-image"
        src={images[currentImage]}
        alt=""
      />
    </AnimatePresence>
  );
};

const ProductLanding = ({ currentImage, data }) => {
  return (
    <div className="productlanding-container">
      <BackgroundMedia currentImage={currentImage} images={data.images} />
    </div>
  );
};

export default ProductLanding;
