import { useEffect, useState } from "react";
import "./ScrollIndicator.scss";
import { AnimatePresence, motion, useScroll } from "framer-motion";

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    scrollYProgress.on("change", (e) => {
      if (e > 0) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    });
  }, []);
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="scrollindicator-container"
          >
            <div className="scrollindicator-container-inner">
              <div className="scrollindicator-container-inner-point"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollIndicator;
