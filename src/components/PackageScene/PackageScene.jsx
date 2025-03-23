import { Canvas } from "@react-three/fiber";
import DrealPackage from "./DrealPackage";
import "./PackageScene.scss";
import { Float, SoftShadows } from "@react-three/drei";
import {
  animate,
  useMotionValue,
  cubicBezier,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";
import Camera from "./Camera";

import bgColor from "../backgroundcolor";
import frameloop from "../utils/frameloop";
import isMobile from "../utils/isMobile";
import CanvasWrapper from "../utils/CanvasWrapper";
import BehindPackageText from "./BehindPackageText/BehindPackageText";
import BehindPackagePics from "../BehindPackagePics/BehindPackagePics";

const PackageScene = ({ reversed = false }) => {
  // const progress = useMotionValue(0);

  const divRef = useRef();

  const { scrollYProgress: progress } = useScroll({
    target: divRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: behindPicsProgress } = useScroll({
    target: divRef,
    offset: ["start start", "end start"],
  });

  const reversedProgress = useTransform(progress, [0, 1], [1, 0]);

  useEffect(() => {
    const handleBackground = (val) => {
      if (reversed) {
        if (val > 0.5) {
          document.body.style.backgroundColor = bgColor;
        } else {
          document.body.style.backgroundColor = "#d7d7d7";
        }
      }
    };
    const unsub = progress.on("change", handleBackground);

    return () => unsub();
  }, []);

  return (
    <div ref={divRef} className="packagescene-container-wrapper">
      <div className="packagescene-container">
        {/* <BehindPackageText /> */}

        <BehindPackagePics scrollYProgress={behindPicsProgress} />

        <CanvasWrapper dpr={!isMobile ? 1.5 : 1} flat>
          <Float
            speed={3}
            floatIntensity={!isMobile ? 0.2 : 0.05}
            rotationIntensity={!isMobile ? 0.3 : 0.1}
          >
            <DrealPackage progress={reversed ? reversedProgress : progress} />
          </Float>
          <Camera />

          <ambientLight intensity={3} />

          <pointLight
            castShadow
            color={"white"}
            intensity={2}
            position={[-1, 2, -3]}
          />
          <pointLight color={"wheat"} intensity={3} position={[3, 2, -10]} />
          <directionalLight
            position={[0, 1, 1]}
            intensity={1}
            castShadow
            shadow-bias={-0.001}
          />
        </CanvasWrapper>
        {/* <BehindPackageText front scrollYProgress={progress} /> */}
      </div>
    </div>
  );
};

export default PackageScene;
