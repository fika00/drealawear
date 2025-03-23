import { Canvas, useFrame } from "@react-three/fiber";
import "./DrealShirtScene.scss";
import { DrealShirtModel } from "./DrealShirtModel";
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import { forwardRef, useEffect, useRef } from "react";
import { useTransform, motion } from "framer-motion";
import isMobile from "../utils/isMobile";
import frameloop from "../utils/frameloop";
import CanvasWrapper from "../utils/CanvasWrapper";
import { ACESFilmicToneMapping } from "three";
import ShirtSectionText from "../ShirtSectionText/ShirtSectionText";
import BottomLeftCorner from "./BottomLeftCorner/BottomLeftCorner";
import BottomRightCorner from "./BottomRightCorner/BottomRightCorner";
import ShirtSceneColorSwitcher from "./ShirtSceneColorSwitcher/ShirtSceneColorSwitcher";
import { colorsWithHex } from "../utils/colors";
import ModelSelector from "./ModelSelector/ModelSelector";

// const camPos = !isMobile ? [-2, 0.2, 4] : [-1, -1, 4];
// const camScale = !isMobile ? 0.005 : 0.008;

// const camPos = !isMobile ? [-2, 0.2, 4] : [0, 2, 4];
const camScale = !isMobile ? 0.005 : 0.009;
const camPos = [0, 0.3, 4];

const camRot = !isMobile ? [0, 0, 0] : [0, 0, 0];

const DrealShirtScene = ({ scrollYProgress, onColorChange }, ref) => {
  const text = ["LifestyleClub"];
  const colors = ["#101010", "#38403e", "#262423", "#101010"];

  const backgroundColor = useTransform(
    scrollYProgress,
    [0.25, 0.4, 0.7, 1],
    colors
  );
  const onShirtModelChangeHandler = (model) => {
    ref.current.setCurrentShirtModel(model);
  };
  return (
    <motion.div
      style={{
        backgroundColor,
      }}
      className="drealshirtscene-container"
    >
      <ShirtSectionText
        scrollYProgress={scrollYProgress}
        text={text}
        front={false}
      />
      <div className="drealshirtscene-container-bottomhud">
        {/* <BottomLeftCorner /> */}

        <ModelSelector onShirtModelChange={onShirtModelChangeHandler} />
        <BottomRightCorner />
      </div>
      <CanvasWrapper
        gl={{ toneMapping: ACESFilmicToneMapping }}
        dpr={1.5}
        // flat
        shadows
      >
        <group rotation={[0, -Math.PI / 5, 0]}>
          <DrealShirtModel ref={ref} scrollYProgress={scrollYProgress} />
        </group>
        {/* <RotatingCamera /> */}
        <OrthographicCamera
          rotation={camRot}
          position={camPos}
          makeDefault
          scale={camScale}
        />

        <pointLight intensity={10} position={[0, 3, -6]} />
        <ambientLight intensity={0.4} />
        <directionalLight intensity={1} position={[0, 0, 5]} />
      </CanvasWrapper>
      <ShirtSceneColorSwitcher
        scrollYProgress={scrollYProgress}
        onChange={onColorChange}
      />

      {/* <ShirtSectionText
        scrollYProgress={scrollYProgress}
        text={text}
        front={true}
      /> */}
    </motion.div>
  );
};

export default forwardRef(DrealShirtScene);
