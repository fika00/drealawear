import { easeInOut, useScroll, useTransform } from "framer-motion";
import HeaderBigAnimated from "../HeaderBigAnimated/HeaderBigAnimated";
import "./ResultsSection.scss";
import { useRef } from "react";
import { motion } from "framer-motion";
import AtoB from "../AtoB/AtoB";

const ResultWindow = ({ data, index, scrollYProgress, main = false }) => {
  const scale = useTransform(scrollYProgress, [0, 0.75], [0.5, 1], {
    ease: easeInOut,
  });

  const borderRadius = useTransform(scrollYProgress, [0.25, 0.5], [70, 0]);

  const innerScale = useTransform(scrollYProgress, [0, 0.75], [2, 1]);
  const clipPath = useTransform(
    scrollYProgress,
    [0.3, 1],
    ["circle(100%)", "circle(30%)"]
  );
  const padding = useTransform(scrollYProgress, [0.25, 0.5], [8, 0]);
  return (
    <motion.div
      style={{
        scale,
      }}
      className="resultwindow-container"
    >
      <motion.div
        style={{
          x: data.x,
          y: data.y,

          borderRadius: !main ? 70 : borderRadius,
          padding: !main ? 8 : padding,

          clipPath: main ? clipPath : "none",
        }}
        className={`resultwindow-container-inner ${
          main ? "resultwindow-container-inner-main" : ""
        }`}
      >
        <div className="resultwindow-container-inner-img-wrapper">
          {!main ? (
            <motion.img
              style={{
                scale: innerScale,
              }}
              loading="lazy"
              src={data.src}
              alt=""
              className="resultwindow-container-inner-img"
            />
          ) : (
            <>
              <motion.video
                style={{
                  scale: innerScale,
                }}
                loading="lazy"
                autoPlay
                loop
                muted
                playsInline
                src={data.src}
                className="resultwindow-container-inner-img"
              />
              <h1 className="resultwindow-container-inner-text">RESULTS</h1>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ResultsSection = () => {
  const gap = 1;
  const images = [
    { src: "/resultPictures/1.webp", x: "-100%", y: 0 },
    { src: "/resultPictures/2.webp", x: "100%", y: 0 },
    {
      src: "/resultPictures/3.webp",
      x: "-100%",
      y: "100%",
    },
    { src: "/resultPictures/4.webp", x: "0%", y: "100%" },
    {
      src: "/resultPictures/5.webp",
      x: "100%",
      y: "100%",
    },
  ];

  const divRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ["start center", "end end"],
  });
  return (
    <div ref={divRef} className="resultssection-container">
      <div className="resultssection-container-inner">
        {images.map((img, i) => (
          <ResultWindow scrollYProgress={scrollYProgress} data={img} key={i} />
        ))}

        <ResultWindow
          scrollYProgress={scrollYProgress}
          main
          data={{
            src: "/productsection.webm",
            x: "0%",
            y: "0%",
          }}
        />
      </div>
    </div>
  );
};

export default ResultsSection;
