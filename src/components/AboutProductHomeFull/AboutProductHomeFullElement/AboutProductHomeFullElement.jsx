import { useTransform } from "framer-motion";
import "./AboutProductHomeFullElement.scss";
import { motion } from "framer-motion";
const AboutProductHomeFullElement = ({
  data,
  segment,
  index,
  scrollYProgress,
  isLast = false,
}) => {
  const range = segment * index;

  const y = useTransform(
    scrollYProgress,
    [range - segment, range],
    ["100%", "0%"]
  );

  const scale = !isLast
    ? useTransform(scrollYProgress, [range, range + segment], [1, 0.95])
    : 1;

  const opacity = !isLast
    ? useTransform(
        scrollYProgress,
        [range + segment, range + segment + 0.01],
        [1, 0]
      )
    : 1;

  return (
    <div className="aboutproductfullelement-container">
      <div
        className={`aboutproductfullelement-container-inner ${
          isLast ? "aboutproductfullelement-container-inner-last" : ""
        }`}
      >
        <motion.div
          style={{
            scale,
            opacity,
          }}
          className="aboutproductfullelement-container-inner-wrapper"
        >
          <img
            src={data.imgSrc}
            alt=""
            className="aboutproductfullelement-container-inner-img"
          />
          <div className="aboutproductfullelement-container-inner-textbox">
            <h1 className="aboutproductfullelement-container-inner-textbox-header playfair">
              {data.header}
            </h1>
            <div className="aboutproductfullelement-container-inner-textbox-line" />
            <h2 className="aboutproductfullelement-container-inner-textbox-subheader playfair">
              {data.subheader}
            </h2>
            <p className="aboutproductfullelement-container-inner-textbox-text">
              {data.text}
            </p>
          </div>
          <div className="aboutproductfullelement-container-inner-counter playfair">
            0{index + 1}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutProductHomeFullElement;
