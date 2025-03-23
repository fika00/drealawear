import "./ParagraphAnimated.scss";

import { motion, cubicBezier } from "framer-motion";

const ParagraphAnimated = ({ text }) => {
  let letterCounter = 0;
  const duration = 1;
  const words = text.split(" ");
  const easing = cubicBezier(0.28, 0.26, 0.16, 1);
  return (
    <motion.div
      initial="initial"
      whileInView="visible"
      className="paragraphanimated-container"
      viewport={{ once: true }}
    >
      {words.map((word, i) => (
        <div key={i} className="paragraphanimated-container-word">
          {word.split("").map((letter, j) => {
            letterCounter++;

            return (
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
                  delay: (letterCounter * duration) / text.split("").length,
                  ease: easing,
                }}
                key={j}
                className="paragraphanimated-container-letter playfair"
              >
                {letter}
              </motion.span>
            );
          })}
        </div>
      ))}
    </motion.div>
  );
};

export default ParagraphAnimated;
