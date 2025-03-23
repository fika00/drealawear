import "./BottomLeftCorner.scss";
import { cubicBezier, motion } from "framer-motion";
const BottomLeftCorner = () => {
  const letters = "Drop 01".split("");
  const cubicEease = cubicBezier(0.3, 0.03, 0.19, 0.94);
  return (
    <motion.div
      whileInView="visible"
      initial="initial"
      className="bottomleftcorner-container"
      transition={{
        staggerChildren: 0.05,
      }}
    >
      {letters.map((letter, i) => (
        <div key={i} className="bottomleftcorner-container-letter-container">
          <motion.h1
            variants={{
              initial: {
                // y: "100%",
                rotateX: "-90deg",
              },
              visible: {
                // y: "0%",
                rotateX: "0deg",
              },
            }}
            transition={{
              ease: cubicEease,
              duration: 1.75,
            }}
            className="bottomleftcorner-container-letter-container-letter playfair"
          >
            {letter}
          </motion.h1>
        </div>
      ))}
    </motion.div>
  );
};

export default BottomLeftCorner;
