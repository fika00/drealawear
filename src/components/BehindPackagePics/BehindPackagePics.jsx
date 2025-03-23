import { useEffect, useRef } from "react";
import "./BehindPackagePics.scss";
import { motion, useScroll, useTransform } from "framer-motion";

const FloatingPicture = ({ classname, imgSrc, scrollYProgress }) => {
  const multiplier = Math.random() + 1;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [20 * multiplier, -20 * multiplier]
  );
  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    [100 * multiplier, -100 * multiplier]
  );

  return (
    <motion.div
      style={{
        translateY,
      }}
      className={`floatingpicture-container ${classname}`}
    >
      <motion.img
        style={{
          y,
        }}
        src={imgSrc}
        alt=""
        className="floatingpicture-container-img"
      />
    </motion.div>
  );
};

const BehindPackagePics = ({ scrollYProgress }) => {
  const parentRef = useRef();

  const images = [
    "/zoomPics/zoom10.webp",
    "/zoomPics/zoom7.webp",
    "/zoomPics/zoom8.webp",
    "/zoomPics/zoom17.webp",
    "/zoomPics/zoom13.webp",
    "/zoomPics/zoom27.webp",
  ];
  return (
    <div ref={parentRef} className="behindpackagepics-container">
      <FloatingPicture
        imgSrc={images[0]}
        classname={"floatingpicture-container-1"}
        scrollYProgress={scrollYProgress}
      />
      <FloatingPicture
        imgSrc={images[1]}
        classname={"floatingpicture-container-2"}
        scrollYProgress={scrollYProgress}
      />
      <FloatingPicture
        imgSrc={images[2]}
        classname={"floatingpicture-container-3"}
        scrollYProgress={scrollYProgress}
      />
      <FloatingPicture
        imgSrc={images[3]}
        classname={"floatingpicture-container-4"}
        scrollYProgress={scrollYProgress}
      />
      <FloatingPicture
        imgSrc={images[4]}
        classname={"floatingpicture-container-5"}
        scrollYProgress={scrollYProgress}
      />
      <FloatingPicture
        imgSrc={images[5]}
        classname={"floatingpicture-container-6"}
        scrollYProgress={scrollYProgress}
      />
    </div>
  );
};

export default BehindPackagePics;
