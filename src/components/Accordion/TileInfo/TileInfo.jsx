import { useEffect, useState } from "react";
import "./TileInfo.scss";
import { motion, cubicBezier } from "framer-motion";

const AnimatedText = ({ text, isExpanded, classname, duration }) => {
  const [isReady, setIsReady] = useState(false);

  const letters = text.split("");
  const ease = cubicBezier(0.63, 0.06, 0.34, 0.97);
  return (
    <motion.div
      transition={{
        staggerChildren: duration / letters.length / 5,
      }}
      initial="initial"
      animate={isExpanded ? "visible" : "initial"}
      className="animatedtext-container"
    >
      {letters.map((letter, i) => (
        <motion.span
          variants={{
            initial: {
              y: "100%",
              rotate: "40deg",
            },
            visible: {
              y: "0%",
              rotate: "0deg",
            },
          }}
          transition={{
            duration: duration,
            ease: ease,
          }}
          className={classname}
          key={i}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const TileInfo = ({ data, isExpanded }) => {
  return (
    <div
      className={`topinfo-container ${
        isExpanded ? "topinfo-container-visible" : ""
      }`}
    >
      <div className="topinfo-container-middle">
        <AnimatedText
          classname={"animatedtext-container-letter"}
          isExpanded={isExpanded}
          text={data.place}
          duration={0.7}
        />
      </div>
      <div className="topinfo-container-right">
        <AnimatedText
          classname={"topinfo-container-middle-date playfair"}
          isExpanded={isExpanded}
          text={data.date}
          duration={0.7}
        />
        <AnimatedText
          classname={"topinfo-container-middle-country playfair"}
          isExpanded={isExpanded}
          duration={0.7}
          text={data.country}
        />
        <AnimatedText
          classname={"topinfo-container-middle-coords playfair"}
          isExpanded={isExpanded}
          duration={0.7}
          text={data.coords}
        />
      </div>
    </div>
  );
};

export default TileInfo;
