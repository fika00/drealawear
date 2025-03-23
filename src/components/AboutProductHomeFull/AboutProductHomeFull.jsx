import { cubicBezier, useScroll, useTransform } from "framer-motion";
import "./AboutProductHomeFull.scss";
import { useRef } from "react";
import { productData } from "../utils/productData";
import AboutProductHomeFullElement from "./AboutProductHomeFullElement/AboutProductHomeFullElement";
import BottomProgressBar from "../BottomProgressBar/BottomProgressBar";

const AboutProductHomeFull = () => {
  const paretnDivRef = useRef();

  const data = productData;

  const { scrollYProgress } = useScroll({
    target: paretnDivRef,
    offset: ["start start", "end end"],
  });

  const length = data.length - 1;

  const segment = 1 / length;

  return (
    <div
      // style={{
      //   height: `${length * 100}vh`,
      // }}
      className="aboutproducthomefull-container"
      ref={paretnDivRef}
    >
      <div className="aboutproducthomefull-container-sticky">
        {data.map((img, i) => (
          <AboutProductHomeFullElement
            segment={segment}
            count={length}
            scrollYProgress={scrollYProgress}
            data={img}
            index={i}
            key={i}
            isLast={i == data.length - 1}
          />
        ))}
        <BottomProgressBar segment={0} scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
};

export default AboutProductHomeFull;
