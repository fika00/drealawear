import "./HeaderBigAnimated.scss";

import { motion, cubicBezier } from "framer-motion";

const HeaderBigAnimated = ({ text, color = "white" }) => {
  const letters = text.split("");
  const easing = cubicBezier(0.28, 0.26, 0.16, 1);
  return (
    <motion.div
      initial="initial"
      whileInView="visible"
      className="headerbiganimated-container"
      viewport={{ once: true }}
      style={{
        color: color,
      }}
    >
      {letters.map((letter, i) => (
        <motion.span
          variants={{
            initial: {
              y: "120%",
              rotate: 10,
            },
            visible: {
              y: 0,
              rotate: 0,
            },
          }}
          transition={{
            duration: 1,
            delay: i * 0.05,
            ease: easing,
          }}
          key={i}
          className="headerbiganimated-container-letter playfair"
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default HeaderBigAnimated;
