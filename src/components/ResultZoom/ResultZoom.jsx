import { useEffect, useRef, useState } from "react";
import "./ResultZoom.scss";
import { motion, useScroll, useTransform, cubicBezier } from "framer-motion";
import BottomProgressBar from "../BottomProgressBar/BottomProgressBar";

const ZoomElement = ({ src, scrollYProgress, index }) => {
  const [side, setSide] = useState();
  const generateRandomRotation = () => {
    return `${Math.random() * 10 * (Math.random() > 0 ? 1 : -1)}deg`;
  };

  const cubic = cubicBezier(0.1, 0.38, 0.48, 0.88);

  const scale = useTransform(
    scrollYProgress,
    [0, Math.random() * 0.2 + 0.6],
    [(Math.random() * 2 + (index + 1)) * 0.5, 0],
    { ease: cubic }
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.6, 0.9],
    [0, 1, 1, 0]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [generateRandomRotation(), generateRandomRotation()]
  );

  const y = useTransform(scrollYProgress, [0, 0.7], [-2000, 0]);

  const prog = index * 1.23;
  const distance = 1500;

  const translatePos = `${Math.sin(prog) * distance}px ${
    Math.cos(prog) * distance
  }px`;

  const styles = {
    rotate,
    translate: translatePos,
  };

  return (
    <motion.div
      className="zoomelement-container"
      style={{
        scale,
        opacity,
      }}
    >
      <motion.img
        className="zoomelement-container-image"
        src={src}
        alt="ResultPicture"
        style={{ ...styles }}
      />
    </motion.div>
  );
};

const TextZoomElement = ({ text, scrollYProgress, index }) => {
  const cubic = cubicBezier(0.1, 0.38, 0.48, 0.88);

  const scale = useTransform(
    scrollYProgress,
    [0, Math.random() * 0.2 + 0.6],
    [(Math.random() * 2 + (index + 1)) * 0.15, 0],
    { ease: cubic }
  );

  const opacity = useTransform(
    scrollYProgress,
    [0.15, 0.5, 0.6, 0.8],
    [0, 1, 1, 0]
  );

  const prog = index * 1.23 + 1 * Math.random();
  const distance = 1500 - 5 * Math.random();

  const translatePos = `${Math.sin(prog) * distance}px ${
    Math.cos(prog) * distance
  }px`;

  const styles = {
    translate: translatePos,
  };

  return (
    <motion.div
      className="zoomelement-container"
      style={{
        scale,
        opacity,
      }}
    >
      <motion.span
        className={`zoomelement-container-text ${
          index % 2 === 0 ? "zoomelement-container-text-serif playfair" : ""
        }`}
        style={{ ...styles }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

const ResultZoom = ({ reversed = false }) => {
  const divRef = useRef();
  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ["start end", "end end"],
  });

  const texts = [
    "Community",
    "Music",
    "Creativity",
    "Lifestyle",
    "Love",
    "People",
    "Innovation",
    "Culture",
    "Expression",
    "Connection",
    "Inspiration",
    "Growth",
    "Collaboration",
    "Freedom",
    "Passion",
    // "Empathy",
    // "Vision",
    // "Art",
    // "Diversity",
    // "Unity",
  ];

  const pics = Array.from({ length: 23 }, (_, i) => ({
    src: `/zoomPics/zoom${i + 1}.webp`,
  }));

  return (
    <div className="resultzoom-container-wrapper">
      <div
        ref={divRef}
        className={`resultzoom-container ${
          reversed ? "resultzoom-container-reversed" : ""
        }`}
      >
        <div className="resultzoom-container-inner">
          {pics.map((pic, i) => (
            <ZoomElement
              scrollYProgress={scrollYProgress}
              index={i}
              key={i}
              src={pic.src}
              style={pic.styles}
              segment={1 / pics.length}
            />
          ))}

          {texts.map((text, i) => (
            <TextZoomElement
              scrollYProgress={scrollYProgress}
              index={i}
              key={i}
              text={text}
              segment={1 / pics.length}
            />
          ))}
          <BottomProgressBar
            scrollYProgress={scrollYProgress}
            startOffset={0.3}
            endOffset={-0.1}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultZoom;
