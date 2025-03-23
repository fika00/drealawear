import { useEffect, useRef } from "react";
import { productData } from "../utils/productData";
import "./AboutProductStory.scss";
import { motion, useScroll, useTransform } from "framer-motion";
import { img } from "framer-motion/client";

const StoryElemenet = ({
  scrollYProgress,
  imgSrc,
  header,
  subheader,
  text,
  left,
  index,
}) => {
  return (
    <div className="storyelement-container">
      <div className="storyelement-container-inner">
        <div className="storyelement-container-inner-wrapper">
          <img
            src={imgSrc}
            className="storyelement-container-inner-wrapper-img"
          />
        </div>
      </div>
    </div>
  );
};

const AboutProductStory = () => {
  const parentRef = useRef();
  const data = productData;

  const { scrollYProgress } = useScroll({
    target: parentRef,
    offset: ["start start", "end start"],
  });

  //   useEffect(() => scrollYProgress.on("change", (e) => console.log(e)));
  return (
    <div
      ref={parentRef}
      style={{ height: `${data.lenght * 100}vh` }}
      className="aboutproductstory-container"
    >
      {data.map((data, i) => (
        <StoryElemenet
          scrollYProgress={scrollYProgress}
          left={i % 2 === 0}
          {...data}
          key={i}
          index={i}
        />
      ))}
    </div>
  );
};

export default AboutProductStory;
