import { useTransform, motion } from "framer-motion";
import "./BehindPackageText.scss";
import isMobile from "../../utils/isMobile";
import StretchText from "../../TestingHeight/StretchText";

const BehindPackageText = ({ front = false, scrollYProgress }) => {
  const opacity = front ? useTransform(scrollYProgress, [0.7, 1], [0, 1]) : 1;
  const text = !isMobile ? "your dreams start here" : "dream real";
  const words = text.split(" ");
  return (
    <motion.div
      style={{
        opacity,
      }}
      className="behindpackagetext-container"
    >
      {/* <h1
        className={`behindpackagetext-container-text playfair ${
          front ? "behindpackagetext-container-text-front" : ""
        }`}
      >
        {text}
      </h1> */}
      {words.map((word, i) => (
        <StretchText
          text={word}
          key={i}
          classname={`behindpackagetext-container-text playfair ${
            front ? "behindpackagetext-container-text-front" : ""
          }`}
        />
      ))}
    </motion.div>
  );
};

export default BehindPackageText;
