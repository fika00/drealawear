import "./ShirtSectionText.scss";
import { motion, useTransform } from "framer-motion";

const Row = ({ text, scrollYProgress, fontHeight, left, front }) => {
  const iterator = Array.from({ length: 4 });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    left ? ["-25%", "25%"] : ["25%", "-25%"]
  );
  return (
    <div className="shirtsectiontext-container-row-container">
      <motion.div
        style={{
          x,
        }}
        className={`shirtsectiontext-container-row-container-inner ${
          left ? "shirtsectiontext-container-row-container-inner-left" : ""
        }`}
      >
        {iterator.map((_, i) => (
          <div
            style={{
              display: "flex",
            }}
            key={i}
          >
            <span
              style={{
                fontSize: fontHeight,
                lineHeight: fontHeight,
              }}
              className={`shirtsectiontext-container-row-container-inner-text playfair shirtsectiontext-container-row-container-inner-text-gray ${
                front
                  ? "shirtsectiontext-container-row-container-inner-text-front"
                  : ""
              }`}
            >
              {text}
            </span>
            <span
              style={{
                fontSize: fontHeight,
                lineHeight: fontHeight,
              }}
              className={`shirtsectiontext-container-row-container-inner-text playfair ${
                front
                  ? "shirtsectiontext-container-row-container-inner-text-front"
                  : ""
              }`}
            >
              {text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const ShirtSectionText = ({
  scrollYProgress,
  fontHeight,
  text,
  front = false,
}) => {
  return (
    <div className="shirtsectiontext-container">
      <Row scrollYProgress={scrollYProgress} front={front} text={text[0]} />
    </div>
  );
};

export default ShirtSectionText;
