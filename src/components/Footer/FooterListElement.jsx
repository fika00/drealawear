import { useMotionValue, motion, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import "./Footer.scss";

const FooterListElement = ({ data, index }) => {
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  const handleHoverStart = () => {
    x.set(5);
  };

  const handleHoverEnd = () => {
    x.set(0);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  };
  return (
    <motion.div
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      key={index}
      style={{ x: springX }}
    >
      <Link
        // onClick={scrollToTop}
        to={data[0]}
        className="footerlist-container-text"
      >
        {data[1]}
      </Link>
    </motion.div>
  );
};

export default FooterListElement;
