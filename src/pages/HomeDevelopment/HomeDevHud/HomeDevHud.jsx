import isMobile from "../../../components/utils/isMobile";
import "./HomeDevHud.scss";
import { motion } from "framer-motion";
const AnimatedText = ({ text, front = false }) => {
  const words = text.split(" ");
  const len = words.lenght;
  return (
    <motion.div
      initial="initial"
      animate="visible"
      transition={{
        staggerChildren: 0.4,
        delayChildren: 0.5,
      }}
      className={`homedevhud-container ${
        front ? "homedevhud-container-outline" : ""
      } `}
    >
      <div className="homedevhud-container-inner">
        {words.map((word, i) => (
          <motion.h1
            variants={{
              initial: {
                filter: "blur(5px)",
                opacity: 0,
                y: 15,
              },
              visible: {
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
              },
            }}
            transition={{
              duration: 2,
            }}
            className={`homedevhud-container-header playfair ${
              front ? "homedevhud-container-header-outline" : ""
            }`}
            key={i}
          >
            {word}
            {i !== len ? " " : ""}
          </motion.h1>
        ))}
      </div>
    </motion.div>
  );
};

const HomeDevHud = () => {
  const text = isMobile ? "Open Dec. 1st" : "Opening 1st December";
  return (
    <>
      <AnimatedText text={text} />
      <AnimatedText text={text} front={true} />
    </>
  );
};

export default HomeDevHud;
