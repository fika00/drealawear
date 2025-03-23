import { easeInOut, useScroll, useTransform } from "framer-motion";
import "./ProcessSection.scss";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AtoB from "../AtoB/AtoB";

const MovingWord = ({ word, index, parentDivWidth, scrollYProgress }) => {
  const [wordWidth, setWordWidth] = useState(0);
  const wordRef = useRef();
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    index % 2 !== 0 ? [wordWidth / 1.5, 0] : [-wordWidth / 1.5, 0]
  );

  useEffect(() => {
    const handleResize = () => {
      if (wordRef.current) {
        const { width } = wordRef.current.getBoundingClientRect();
        setWordWidth(width);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.span
      ref={wordRef}
      style={{
        x,
      }}
      className="animatedtextprocess-container-inner-text"
    >
      {word}
    </motion.span>
  );
};

const AnimatedTextProcess = ({ text, scrollYProgress }) => {
  const divRef = useRef();
  const words = text.split(" ");

  return (
    <div className="animatedtextprocess-container">
      <div ref={divRef} className="animatedtextprocess-container-inner">
        {words.map((word, i) => (
          <MovingWord
            index={i}
            parentDivWidth={0}
            scrollYProgress={scrollYProgress}
            word={word}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

const ProcessBottomText = () => {
  return (
    <div className="processbottomtext-container">
      <span className="processbottomtext-container-head">
        Crafted to Perfection
      </span>
      <span className="processbottomtext-container-text">
        From premium fabric to timeless design, every detail counts.
      </span>
    </div>
  );
};

const Media = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 1], {
    ease: easeInOut,
  });

  const borderRadius = useTransform(scrollYProgress, [0, 1], ["100px", "0px"]);
  // const clipPath = useTransform(
  //   scrollYProgress,
  //   [0.5, 1],
  //   [
  //     "polygon(0% 0%,100% 0%, 100% 100%, 0% 100%)",
  //     "polygon(0% 0%,100% 0%, 100% 90%, 0% 100%)",
  //   ]
  // );

  return (
    <div className="processmedia-container">
      <div className="processmedia-container-inner">
        <motion.div
          style={{
            scale,
            borderRadius,
            // clipPath,
          }}
          className="processmedia-container-inner-videocont"
        >
          <video
            className="processmedia-container-inner-videocont-video"
            muted
            autoPlay
            playsInline
            loop
            src="processVideo.webm"
          />
        </motion.div>
        <AnimatedTextProcess
          scrollYProgress={scrollYProgress}
          text={"Work Path"}
        />
        <ProcessBottomText />
      </div>
    </div>
  );
};

const ProcessSection = () => {
  const mediaRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      style={{
        height: "200vh",
      }}
      ref={mediaRef}
      className="processsection-container"
    >
      <Media scrollYProgress={scrollYProgress} />

      {/* <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          translate: "-50% -50%",
          zIndex: 3,
        }}
      >
        <AtoB height="40vh" pointA={"Idea"} pointB={"Fruition"} />
      </div> */}
    </div>
  );
};

export default ProcessSection;
