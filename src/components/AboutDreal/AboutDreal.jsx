import { useEffect, useRef, useState } from "react";
import "./AboutDreal.scss";
import { useScroll, useTransform, motion } from "framer-motion";
import StretchText from "../TestingHeight/StretchText";
import PerspectiveTextAnimation from "./PerspectiveTextAnimation/PerspectiveTextAnimation";
import isMobile from "../utils/isMobile";

const SmallText = ({ scrollYProgress }) => {
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  return (
    <motion.div
      style={{
        y,
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1,
          duration: 2,
        }}
        viewport={{
          once: true,
        }}
        className="aboutdreal-container-inner-text playfair"
      >
        A place where dreams meet reality. -Dreal
      </motion.div>
    </motion.div>
  );
};

const FloatingImage = ({ imgSrc, scrollYProgress }) => {
  const amplitude = Math.random();
  const yParalax = useTransform(
    scrollYProgress,
    [0, 1],
    [75 * amplitude, -75 * amplitude]
  );
  return (
    <motion.img
      style={{
        y: yParalax,
      }}
      src={imgSrc}
      className="aboutdreal-container-inner-img-wrapper-img"
    />
  );
};

const AboutDreal = () => {
  const parentDivRef = useRef();

  const { scrollYProgress } = useScroll({
    target: parentDivRef,
    offset: ["start end", "end start"],
  });

  return (
    <div className="aboutdreal-container" ref={parentDivRef}>
      <div className="aboutdreal-container-inner">
        <div className="aboutdreal-container-inner-left">
          <StretchText>
            <PerspectiveTextAnimation
              transformOrigin="top"
              classname={"stretchtext-container-textwrapper-text playfair"}
              text={"dreams"}
            />
          </StretchText>
          <StretchText>
            <PerspectiveTextAnimation
              transformOrigin="bottom"
              classname={
                "aboutdreal-container-inner-left-reality stretchtext-container-textwrapper-text playfair"
              }
              text={"reality"}
            />
          </StretchText>
        </div>
        <div className="aboutdreal-container-inner-right">
          <div className="aboutdreal-container-inner-img-wrapper aboutdreal-container-inner-img-wrapper-1">
            <FloatingImage
              scrollYProgress={scrollYProgress}
              imgSrc={"/homePics/aboutDreal/1.webp"}
            />
          </div>
          <div className="aboutdreal-container-inner-img-wrapper aboutdreal-container-inner-img-wrapper-2">
            <FloatingImage
              scrollYProgress={scrollYProgress}
              imgSrc={"/homePics/aboutDreal/2.webp"}
            />
          </div>
          <div className="aboutdreal-container-inner-img-wrapper aboutdreal-container-inner-img-wrapper-3">
            <FloatingImage
              scrollYProgress={scrollYProgress}
              imgSrc={"/homePics/aboutDreal/3.webp"}
            />
          </div>
          {!isMobile && <SmallText scrollYProgress={scrollYProgress} />}
        </div>
      </div>
    </div>
  );
};

export default AboutDreal;
