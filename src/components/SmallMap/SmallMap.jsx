import { useTransform, motion, easeInOut } from "framer-motion";
import "./SmallMap.scss";
const SmallMap = ({ scrollYProgress, images, onClick }) => {
  const onClickHandler = (index) => {
    if (typeof onClick === "function") onClick(index);
  };
  return (
    <div className="smallmap-container">
      {images.map((img, i) => {
        const segment = 1 / images.length;
        const start = segment + segment * i;
        const scaleY = useTransform(
          scrollYProgress,
          [start - 0.3, start, start + 0.3],
          [1, 2, 1],
          {
            ease: easeInOut,
          }
        );

        const backgroundColor = useTransform(
          scrollYProgress,
          [start - 0.2, start, start + 0.2],
          ["#808080", "#f9de8e", "#808080"],
          {
            ease: easeInOut,
          }
        );

        const index = i;

        return (
          <motion.div
            style={{
              scaleY,
              backgroundColor,
            }}
            key={i}
            onClick={() => onClickHandler(index)}
            className="smallmap-container-line"
          ></motion.div>
        );
      })}
    </div>
  );
};

export default SmallMap;
