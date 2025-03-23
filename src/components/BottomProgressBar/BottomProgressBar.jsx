import { useTransform, motion } from "framer-motion";
import "./BottomProgressBar.scss";
import { useEffect } from "react";

const BottomProgressBar = ({
  scrollYProgress,
  startOffset = 0,
  endOffset = 0,
}) => {
  const scaleX = useTransform(
    scrollYProgress,
    [0 + startOffset, 1 + endOffset],
    [0, 1]
  );

  const opacity = useTransform(
    scrollYProgress,
    [startOffset, startOffset + 0.01, 1 + endOffset - 0.01, 1 + endOffset],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{
        scaleX,
        opacity,
      }}
      className="bottomprogressbar-container"
    ></motion.div>
  );
};

export default BottomProgressBar;
