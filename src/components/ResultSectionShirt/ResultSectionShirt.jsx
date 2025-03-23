import {
  animate,
  cubicBezier,
  easeInOut,
  easeOut,
  useMotionValue,
  useScroll,
  useTransform,
  useVelocity,
} from "framer-motion";
import DrealShirtScene from "../DrealShirtScene/DrealShirtScene";
import ResultShirtSpecs from "../ResultShirtSpecs/ResultShirtSpecs";
import "./ResultSectionShirt.scss";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AtoB from "../AtoB/AtoB";
import { lerp } from "three/src/math/MathUtils.js";
import SmallMap from "../SmallMap/SmallMap";
import isMobile from "../utils/isMobile";
import SmallNavigator from "./SmallNavigator/SmallNavigator";
import { colors, colorsWithHex } from "../utils/colors";
import { useLenis } from "lenis/react";

const ResultSectionShirt = () => {
  const divRef = useRef();
  const shirtRef = useRef();

  const lenis = useLenis();

  // const scrollYProgress = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ["start start", "end end"],
  });

  const handleOnChange = (index) => {
    if (divRef.current) {
      const offsetTop =
        divRef.current.getBoundingClientRect().top + lenis.scroll;

      const scrollTarget = index * window.innerHeight + offsetTop;

      lenis.scrollTo(scrollTarget, { duration: 3 });
    }
  };

  return (
    <div className="resultsectionshirt-container">
      <div
        ref={divRef}
        className="resultsectionshirt-container-inner"
        id="productSection"
      >
        <div className="resultsectionshirt-container-inner-sticky">
          <DrealShirtScene
            onColorChange={handleOnChange}
            scrollYProgress={scrollYProgress}
            ref={shirtRef}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultSectionShirt;
