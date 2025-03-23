import "./PerspectiveTextAnimation.scss";
import { cubicBezier, motion } from "framer-motion";

const PerspectiveTextAnimation = ({
  text,
  classname,
  transformOrigin = "top",
}) => {
  const letters = text.split("");

  const cubicEase = cubicBezier(0.49, 0, 0.41, 0.98);
  return (
    <motion.div
      whileInView="visible"
      initial="initial"
      transition={{
        staggerChildren: 0.1,
        // delayChildren: 0.3,
      }}
      viewport={{
        once: true,
      }}
      className="perspectivetextanimation-container"
    >
      {letters.map((letter, i) => (
        <div
          style={{
            overflow: "hidden",
          }}
          key={i}
        >
          <motion.div
            variants={{
              initial: {
                y: transformOrigin === "bottom" ? "100%" : "-100%",
                // rotateX: transformOrigin === "bottom" ? "-90deg" : "90deg",
              },
              visible: {
                y: "0%",
                // rotateX: "0deg",
              },
            }}
            transition={{
              duration: 1.35,
              ease: cubicEase,
            }}
            key={i}
            className="perspectivetextanimation-container-letterwrapper"
            style={{
              transformOrigin: transformOrigin,
            }}
          >
            <span
              className={`perspectivetextanimation-container-letterwrapper-letter ${classname}`}
            >
              {letter}
            </span>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

export default PerspectiveTextAnimation;
