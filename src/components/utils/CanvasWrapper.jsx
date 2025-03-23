import { Canvas } from "@react-three/fiber";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const CanvasWrapper = ({ children, ...props }) => {
  const containerRef = useRef();

  const isInView = useInView(containerRef);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
      ref={containerRef}
      className="canvas-wrapper-component"
    >
      <Canvas
        {...props}
        frameloop={isInView ? "always" : "demand"}
        // frameloop={"demand"}
      >
        {children}
      </Canvas>
    </div>
  );
};

export default CanvasWrapper;
