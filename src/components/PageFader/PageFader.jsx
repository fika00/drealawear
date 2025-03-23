import { useState } from "react";
import "./PageFader.scss";
import { AnimatePresence, cubicBezier, easeInOut, motion } from "framer-motion";
import { useFader } from "../utils/context";

const PageFader = () => {
  const duration = 0.3;
  const { isFaderVisible } = useFader();

  const cubicEase = cubicBezier(0.34, 0.04, 0.4, 0.98);

  return (
    <AnimatePresence mode="wait">
      {isFaderVisible && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: duration,
            ease: cubicEase,
          }}
          className="pagefader-container"
        />
      )}
    </AnimatePresence>
  );
};

export default PageFader;
