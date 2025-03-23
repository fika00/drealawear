import { useEffect, useRef, useState } from "react";
import "./ProductBold.scss";
import {
  useInView,
  useScroll,
  useTransform,
  motion,
  useSpring,
  cubicBezier,
} from "framer-motion";
import ProductContentRow from "../ProductContentRow/ProductContentRow";
import DynamicDivider from "../DynamicDivider/DynamicDivider";

const AnimatedText = ({ text, classname, duration }) => {
  const [isReady, setIsReady] = useState(false);

  const letters = text.split("");
  const ease = cubicBezier(0.63, 0.06, 0.34, 0.97);
  return (
    <motion.div
      transition={{
        staggerChildren: duration / letters.length / 5,
      }}
      viewport={{
        once: true,
      }}
      initial="initial"
      // animate={isExpanded ? "visible" : "initial"}
      whileInView="visible"
      className="animatedtext-container"
      style={{
        overflow: "hidden",
        position: "absolute",
        left: 0,
        bottom: 0,
      }}
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

const TextRow = ({ text, scrollYProgress, reversed, black, count, index }) => {
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reversed ? [100, -100] : [-100, 100]
  );

  const opacity = Math.pow(
    (Math.sin((Math.PI / (count - 1)) * index) + 1) / 2,
    4
  );

  return (
    <motion.div
      style={{
        x,
        opacity,
      }}
      className="scrolltext-container-inner"
    >
      <span
        className={`scrolltext-container-inner-span ${
          black ? "scrolltext-container-inner-span-black" : ""
        }  `}
      >
        {text.repeat(4)}
      </span>
    </motion.div>
  );
};

const ScrollText = ({ textRowCount, text, scrollYProgress, black }) => {
  const iterator = Array.from(Array(textRowCount).keys());
  return (
    <div className="scrolltext-container">
      {iterator.map((element) => (
        <TextRow
          count={iterator.length}
          black={black}
          key={element}
          text={text}
          index={element}
          reversed={element % 2 === 0}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
};

const ProductBold = ({ parentScroll, shirt }) => {
  const [isVisible, setIsVisible] = useState(false);

  const divRef = useRef(null);

  const data = {
    dreal: {
      imgSrc: "/clubPics/3.webp",
      frontSrc: "/clubPics/3_front.webp",
      text: "Join the club.",
      textRowCount: 3,
    },
    lifestyle: {
      imgSrc: "/cataloguepics/lifestyle/grid/banner.webp",
      frontSrc: "/cataloguepics/lifestyle/grid/banner_front.webp",
      text: "Reach the heights and goals.",
      textRowCount: 5,
    },
  };

  const currentData = shirt === "lifestyle" ? data.lifestyle : data.dreal;

  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ["start end", "end start"],
  });

  // const y = useTransform(parentScroll, [0, 1], [75, -75]);
  // const x = useTransform(parentScroll, [0, 1], [50, -50]);

  return (
    <div className={`productbold-container`}>
      {/* <DynamicDivider /> */}
      {/* <ProductContentRow gridImgs={gridImgs} /> */}

      {/* <ScrollText
        textRowCount={currentData.textRowCount}
        text={currentData.text}
        black
        scrollYProgress={parentScroll}
      /> */}

      <div className="productbold-container-shadow">
        <motion.div
          className={`productbold-container-inner ${
            shirt === "lifestyle" ? "productbold-container-inner-reversed" : ""
          }`}
          ref={divRef}
        >
          <motion.img
            src={currentData.imgSrc}
            style={
              {
                // y,
                // x,
              }
            }
            alt=""
            className="productbold-container-inner-image"
          />

          <ScrollText
            textRowCount={4}
            text={currentData.text}
            scrollYProgress={parentScroll}
          />
          <motion.img
            src={currentData.frontSrc}
            alt=""
            className="productbold-container-inner-image-front"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProductBold;
