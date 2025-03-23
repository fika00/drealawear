import "./ProductGridElementnfo.scss";
import { motion } from "framer-motion";
const AnimatedText = ({ text, className, isOpen }) => {
  const letters = text.split("");
  return (
    <motion.div
      initial="initial"
      animate={isOpen ? "visible" : "initial"}
      transition={{
        staggerChildren: 0.01,
      }}
      className="animated-container"
      style={{
        position: "relative",
      }}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={{
            initial: {
              opacity: 0,
              scaleY: 0.2,
            },
            visible: {
              opacity: 1,
              scaleY: 0.6,
            },
          }}
          className={className}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const ProductGridElementnfo = ({ data, side, isOpen }) => {
  return (
    <div className={`productgridinfo-container `}>
      <AnimatedText
        isOpen={isOpen}
        className="productgridinfo-container-color"
        text={data.color}
      />
    </div>
  );
};

export default ProductGridElementnfo;
