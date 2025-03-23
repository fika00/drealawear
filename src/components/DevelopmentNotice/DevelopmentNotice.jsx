import { useState } from "react";
import "./DevelopmentNotice.scss";
import { AnimatePresence, motion } from "framer-motion";

const DevelopmentNotice = () => {
  const [isClosed, setIsClosed] = useState(false);
  return (
    <AnimatePresence>
      {!isClosed && (
        <motion.div
          initial={{
            y: 10,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: 10,
            opacity: 0,
          }}
          className="developmentnotice-container"
        >
          <span className="developmentnotice-container-text">
            Under development.
          </span>
          <div
            onClick={() => setIsClosed(true)}
            className="developmentnotice-container-close"
          >
            <img
              className="developmentnotice-container-close-img"
              src="/icons/e-remove.svg"
              alt=""
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DevelopmentNotice;
