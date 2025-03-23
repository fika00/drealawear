import { useEffect, useRef, useState } from "react";
import "./AtoB.scss";
import { motion, useScroll, useTransform } from "framer-motion";

const Point = ({ text, side, scrollYProgress }) => {
  const [isTextVisible, setIsTextVisible] = useState(false);

  const topTextContidtion = 0.15;
  const botTextContidtion = 1;
  const scale = useTransform(
    scrollYProgress,
    side === "top" ? [0, topTextContidtion] : [0.85, 1],
    side === "top" ? [0, botTextContidtion] : [0, 1]
  );

  useEffect(() => {
    const handleText = (e) => {
      if (side === "top") {
        if (e >= topTextContidtion) {
          setIsTextVisible(true);
        } else setIsTextVisible(false);
      } else {
        if (e >= botTextContidtion) {
          setIsTextVisible(true);
        } else setIsTextVisible(false);
      }
    };
    const unsub = scrollYProgress.on("change", handleText);
  }, []);

  return (
    <motion.div
      style={{
        scale,
      }}
      className={`atob-point-container ${
        side === "bottom" ? "atob-point-container-bottom" : ""
      }`}
    >
      <div className="atob-point-container-inner">
        <motion.span
          initial={{
            opacity: 0,
            y: "0%",
          }}
          animate={
            isTextVisible
              ? {
                  opacity: 1,
                  y: side === "top" ? "-100%" : "100%",
                }
              : {
                  opacity: 0,
                  y: "0%",
                }
          }
          transition={{
            duration: 0.3,
          }}
          className={`atob-point-container-inner-text ${
            side === "bottom" ? "atob-point-container-inner-text-bottom" : ""
          }`}
        >
          {text}
        </motion.span>
      </div>
    </motion.div>
  );
};

const Line = ({ scrollYProgress }) => {
  const scaleY = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);
  return (
    <motion.div
      style={{
        scaleY,
      }}
      className="atob-line-container"
    ></motion.div>
  );
};

const AtoB = ({ height = "50vh", pointA, pointB, style }) => {
  const divRef = useRef();

  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ["start .99", "end .7"],
  });

  return (
    <div ref={divRef} style={{ ...style, height }} className="atob-container">
      <Point scrollYProgress={scrollYProgress} text={pointA} side={"top"} />
      <Line scrollYProgress={scrollYProgress} />
      <Point scrollYProgress={scrollYProgress} text={pointB} side={"bottom"} />
    </div>
  );
};

export default AtoB;
