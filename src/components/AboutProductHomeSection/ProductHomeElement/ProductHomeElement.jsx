import "./ProductHomeElement.scss";
import {
  cubicBezier,
  easeInOut,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
const ProductHomeElement = ({
  imgSrc,
  text,
  header,
  subheader,
  index,
  scrollYProgress,
  segment,
  count,
}) => {
  const cubicEase = cubicBezier(0.44, 0, 0.58, 0.99);
  const x = useTransform(
    scrollYProgress,
    [segment * index - segment, segment * index + segment],
    [`${count * 75}%`, `-${count * 75}%`]
  );

  const paralax = useTransform(
    scrollYProgress,
    [segment * index - segment * 1.5, segment * index + segment * 1.5],
    [-300, 300]
  );

  const scale = useTransform(
    scrollYProgress,
    [segment * index - segment, segment * index, segment * index + segment],
    [0.95, 1, 1],
    { ease: cubicEase }
  );

  const opacity = useTransform(
    scrollYProgress,
    [segment * index - segment, segment * index, segment * index + segment],
    [0.3, 1, 0],
    { ease: cubicEase }
  );

  const rotateY = useTransform(
    scrollYProgress,
    [
      segment * index - segment * 1.2,
      segment * index,
      segment * index + segment * 1.2,
    ],
    ["10deg", "5deg", "-3deg"]
  );

  const textX = useTransform(
    scrollYProgress,
    [segment * index - segment, segment * index + segment],
    [-400, 250]
  );

  return (
    <motion.div style={{ x, scale }} className="producthomeelement-container">
      <motion.div
        style={{
          rotateY,
        }}
        className="producthomeelement-container-inner"
      >
        <motion.div
          style={{
            opacity,
            x: textX,
          }}
          className="producthomeelement-container-inner-info"
        >
          <span className="producthomeelement-container-inner-info-counter playfair">
            0{index + 1}
          </span>
          <h2 className="producthomeelement-container-inner-info-header playfair">
            {subheader}
          </h2>
          <p className="producthomeelement-container-inner-info-text">{text}</p>
        </motion.div>
        <div
          style={{
            overflow: "hidden",
            width: "100%",
            height: "100%",
          }}
          className="producthomeelement-container-inner-imgwrapp"
        >
          <motion.img
            style={{
              scale: 1.2,
              x: paralax,
            }}
            src={imgSrc}
            alt="Product image"
            className="producthomeelement-container-inner-img"
          />
        </div>
        <span className="producthomeelement-container-inner-header">
          {header}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default ProductHomeElement;
