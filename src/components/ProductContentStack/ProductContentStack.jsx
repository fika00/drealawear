import { useEffect, useRef, useState } from "react";
import "./ProductContentStack.scss";
import {
  useScroll,
  useTransform,
  motion,
  easeInOut,
  easeOut,
  useSpring,
} from "framer-motion";
import ContentOverlay from "./ContentOverlay/ContentOverlay";
import SmallMap from "../SmallMap/SmallMap";

const DrealWearTextBig = ({ x, scrollYProgress }) => {
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  return (
    <motion.h1
      style={{
        y,
        x,
      }}
      className="drealweartextbig"
    >
      Dreal Wear
    </motion.h1>
  );
};

const Image = ({ image, left }) => {
  return (
    <motion.div className="contentwindow-container-inner">
      <img src={image.back} alt="" className="contentwindow-container-bgImg" />
      <img
        src={image.front}
        alt=""
        className="contentwindow-container-frontImg"
      />
    </motion.div>
  );
};

const ContentWindow = ({ scrollYProgress, images, zIndex }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const windowRef = useRef(null);

  const x = useTransform(
    scrollYProgress,
    [1 / images.length, 1],
    [0, -containerWidth * (images.length - 1)]
  );
  const invertedX = useTransform(
    scrollYProgress,
    [1 / images.length, 1],
    [0, containerWidth * (images.length - 1)]
  );

  const yWindow = useTransform(scrollYProgress, [0, 0.2], ["20%", "0%"], {
    ease: easeOut,
  });

  useEffect(() => {
    const resizeHandler = () => {
      if (windowRef.current) {
        setContainerWidth(windowRef.current.offsetWidth);
      }
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <motion.div
      style={{
        y: yWindow,
      }}
      className="contentwindow-container"
      ref={windowRef}
    >
      <motion.div
        style={{
          x,
        }}
        className="contentwindow-container-row"
      >
        {images.map((img, i) => (
          <Image image={img} key={i} />
        ))}

        <DrealWearTextBig x={invertedX} scrollYProgress={scrollYProgress} />
      </motion.div>
      <ContentOverlay />
    </motion.div>
  );
};

const ProductContentStack = ({ images }) => {
  const parentRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: parentRef,
    offset: ["start end", "end end"],
  });
  const scrollIntoView = (index) => {
    const element = parentRef.current;
    if (!element) return;

    const offset = window.innerHeight * index;

    const elementTop = element.getBoundingClientRect().top;

    window.scrollBy({
      top: elementTop + offset,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={parentRef}
      style={{
        minHeight: `${images.length * 100}vh`,
      }}
      className="productcontentstack-container"
    >
      <div className="productcontentstack-container-sticky">
        <ContentWindow
          zIndex={1}
          images={images}
          scrollYProgress={scrollYProgress}
        />

        <SmallMap
          onClick={scrollIntoView}
          images={images}
          scrollYProgress={scrollYProgress}
        />
      </div>
    </div>
  );
};

export default ProductContentStack;
