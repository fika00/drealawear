import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./ResultShirtSpecs.scss";
import { animate, motion, useMotionValue } from "framer-motion";

const WordRow = ({ words }) => {
  return (
    <div className="resultshirtspecs-container-inner-row">
      {words.map((word, i) => (
        <span
          key={i}
          className={`resultshirtspecs-container-inner-row-word ${
            i % 2 === 0
              ? "resultshirtspecs-container-inner-row-word-1 playfair"
              : ""
          }`}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

const ResultShirtSpecs = () => {
  const x = useMotionValue(0);
  const divRef = useRef();
  const words = [
    "Stylish",
    "Soft",
    "Breathable",
    "Durable",
    "Sleek",
    "Tailored",
    "Versatile",
    "Lightweight",
    "Refined",
    "High-quality",
    "Timeless",
    "Crafted",
  ];
  const [rowWidth, setRowWidth] = useState(null);

  const animateX = () => {
    x.set(0);
    animate(x, -rowWidth, {
      onComplete: animateX,
      duration: 20,
      ease: "linear",
    });
  };

  useEffect(() => {
    const handleResize = () => {
      const innerWidth = divRef.current.scrollWidth;
      setRowWidth(innerWidth / 2);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (rowWidth) {
      animateX();
    }
  }, [rowWidth]);

  return (
    <div className="resultshirtspecs-container">
      <motion.div
        ref={divRef}
        style={{
          x,
        }}
        className="resultshirtspecs-container-inner"
      >
        <WordRow words={words} />
        <WordRow words={words} />
      </motion.div>
    </div>
  );
};

export default ResultShirtSpecs;
