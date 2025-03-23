import { cubicBezier, useScroll, useTransform, motion } from "framer-motion";
import "./AboutProductHomeSection.scss";
import ProductHomeElement from "./ProductHomeElement/ProductHomeElement";
import { useRef } from "react";
import { productData } from "../utils/productData";
import BottomProgressBar from "../BottomProgressBar/BottomProgressBar";

const AboutProductHomeSection = () => {
  const dir = "/productPics";

  const paretnDivRef = useRef();

  const data = productData;

  const { scrollYProgress } = useScroll({
    target: paretnDivRef,
    offset: ["start start", "end start"],
  });

  const cubicEase = cubicBezier(0.45, 0.01, 0.51, 0.98);

  const easedScroll = useTransform(scrollYProgress, [0, 1], [0, 1], {
    ease: cubicEase,
  });

  const length = data.length;

  const segment = 1 / length;

  return (
    <div
      style={{
        height: `${length * 100}vh`,
      }}
      className="aboutproducthomesection-container"
      ref={paretnDivRef}
    >
      <div className="aboutproducthomesection-container-sticky">
        <div className="aboutproducthomesection-container-sticky-header">
          <span className="aboutproducthomesection-container-sticky-header-text ">
            Product
          </span>
          <span
            style={{
              color: "gray",
            }}
            className="aboutproducthomesection-container-sticky-header-text playfair"
          >
            Itself
          </span>
        </div>
        {data.map((img, i) => (
          <ProductHomeElement
            segment={segment}
            count={length}
            scrollYProgress={easedScroll}
            {...img}
            index={i}
            key={i}
          />
        ))}
        <BottomProgressBar
          segment={segment}
          scrollYProgress={scrollYProgress}
        />
      </div>
    </div>
  );
};

export default AboutProductHomeSection;
