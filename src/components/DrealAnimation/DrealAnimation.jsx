import { useEffect, useRef, useState } from "react";
import "./DrealAnimation.scss";

import { motion, useScroll, useTransform, useVelocity } from "framer-motion";
import { useLenis } from "lenis/react";
import { useFader } from "../utils/context";

const MiddleText = ({ isFront = false }) => {
  return (
    <div className="drealanimation-container-sticky-inner">
      <span className="drealanimation-container-sticky-inner-text">
        a place where{" "}
        <div
          style={{
            position: "relative",
            display: "inline",
          }}
        >
          <span
            className={`drealanimation-container-sticky-inner-text-highlighted playfair ${
              isFront
                ? "drealanimation-container-sticky-inner-text-highlighted-front"
                : ""
            }`}
          >
            dreams
          </span>{" "}
          {isFront && (
            <span
              style={{
                position: "absolute",
                left: "110%",
                top: "55%",
                translate: "-50% -50%",
                fontWeight: 200,
              }}
              className="drealanimation-container-sticky-inner-text-highlighted-front"
            >
              +
            </span>
          )}
        </div>
        meet{" "}
        <div
          style={{
            position: "relative",
            display: "inline",
          }}
        >
          <span
            className={`drealanimation-container-sticky-inner-text-highlighted ${
              isFront
                ? "drealanimation-container-sticky-inner-text-highlighted-front"
                : ""
            }`}
          >
            reality
          </span>
        </div>
      </span>
    </div>
  );
};

const DropLet = ({ scrollYProgress, shadow = false }) => {
  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [!shadow ? -1000 : -2000, 0]
  );
  const yVelocity = useVelocity(y);
  const scaleY = useTransform(yVelocity, [-300, 0, 300], [1.5, 1, 1.5]);

  return (
    <div className="droplet-container">
      <div
        className="droplet-container-inner"
        style={{
          rotate: shadow && "-80deg",
        }}
      >
        <motion.div
          style={{
            y,
            scaleY,
            filter: shadow
              ? useTransform(
                  scrollYProgress,
                  [0, 0.35, 0.5],
                  ["blur(20px)", "blur(15px)", "blur(3px)"]
                )
              : "none",
          }}
          className={`droplet-container-inner-point ${
            shadow ? "droplet-container-inner-point-shadow" : ""
          }`}
        ></motion.div>
      </div>
    </div>
  );
};

const DrealText = ({ scrollYProgress, isDone }) => {
  const clipPath = useTransform(
    scrollYProgress,
    [0.5, 0.7],
    ["circle(0% at 50% 50%)", "circle(100% at 50% 50%)"]
  );
  return (
    <motion.div
      style={{
        clipPath: !isDone ? clipPath : "none",
      }}
      className="drealtext-container"
    >
      <MiddleText isFront />
    </motion.div>
  );
};

const DrealAnimation = () => {
  const containerRef = useRef(null);
  const [isDone, setIsDone] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  useEffect(() => {
    const handleProgress = (e, unsub) => {
      if (e >= 0.95) {
        setIsDone(true);
        unsub();
      }
    };

    const unsub = scrollYProgress.on("change", (e) => handleProgress(e, unsub));

    return () => unsub();
  }, []);

  return (
    <div ref={containerRef} className={`drealanimation-container`}>
      <div className="drealanimation-container-sticky">
        <MiddleText />
        <DropLet scrollYProgress={scrollYProgress} />
        <DropLet shadow scrollYProgress={scrollYProgress} />
        <DrealText isDone={isDone} scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
};

export default DrealAnimation;
