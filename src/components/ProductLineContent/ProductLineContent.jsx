import { useEffect, useRef, useState } from "react";
import "./ProductLineContent.scss";
import { easeOut, motion, useScroll, useTransform } from "framer-motion";

const Point = ({ scroll, isLast, hasFinished }) => {
  const scale = useTransform(scroll, !isLast ? [0, 0.05] : [0.7, 0.8], [0, 1]);
  return (
    <motion.div
      style={{
        scale: !hasFinished ? scale : 1,
      }}
      className={`productlinecontent-container-point ${
        isLast ? "productlinecontent-container-point-bottom" : ""
      }`}
    ></motion.div>
  );
};

const Motive = ({ word, index, top, scroll, start }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isLeft = index % 2 === 0;
  const eventRef = useRef();

  const formattedWord = `${!isLeft ? "-" : ""}${word}${isLeft ? "-" : ""}`;

  useEffect(() => {
    const handleAppear = (value) => {
      if (value > start) {
        setIsVisible(true);
      }
    };
    const unsub = scroll.on("change", handleAppear);
    return () => unsub();
  }, [isVisible]);

  return (
    <div
      className={`motive-container ${isLeft ? "motive-container-left" : ""}`}
      style={{
        top: `${top + 5}%`,
      }}
    >
      {isVisible && (
        <motion.span
          initial={{
            x: isLeft ? 100 : -100,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            ease: easeOut,
          }}
          className="motive-container-text playfair"
        >
          {formattedWord}
        </motion.span>
      )}
    </div>
  );
};

const ProductLineContent = ({ gridImgs }) => {
  const divRef = useRef(null);
  const [hasFinished, setHasFinished] = useState(false);
  const eventListener = useRef();

  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ["start .75", "end center"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  useEffect(() => {
    const handleFinish = (e) => {
      if (e >= 0.8) setHasFinished(true);
    };
    const unsub = scrollYProgress.on("change", handleFinish);

    return () => unsub();
  }, [hasFinished]);

  const motives = ["Community", "Music", "Creativity", "Lifestyle"];

  return (
    <div ref={divRef} className="productlinecontent-container">
      <motion.div
        style={{
          scaleY: !hasFinished ? scaleY : 1,
        }}
        className="productlinecontent-container-line"
      ></motion.div>
      <Point hasFinished={hasFinished} scroll={scrollYProgress} />
      <Point hasFinished={hasFinished} isLast={true} scroll={scrollYProgress} />

      {motives.map((motive, i) => (
        <Motive
          key={i}
          index={i}
          word={motive}
          scroll={scrollYProgress}
          start={(1 / motives.length) * i}
          top={(100 / motives.length) * i}
        />
      ))}
    </div>
  );
};

export default ProductLineContent;
