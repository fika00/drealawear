import React, { useState } from "react";
import { useToast } from "../utils/ToastContext";
import "./ToastContainer.scss"; // CSS for styles
import { AnimatePresence, easeInOut, motion } from "framer-motion";

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="toast-container">
      <div className="toast-container-wrapper">
        <AnimatePresence mode="popLayout">
          {toasts.map(({ id, message, type }, i) => (
            <motion.div
              initial={{
                y: 30,
                opacity: 0,
              }}
              onMouseLeave={() => setIsHovered(false)}
              onMouseOver={() => setIsHovered(true)}
              animate={{
                y: !isHovered
                  ? (toasts.length - 1 - i) * -8
                  : `${(toasts.length - 1 - i) * -110}%`,
                scale: isHovered ? 1 : 1 - (toasts.length - 1 - i) * 0.15,
                opacity: isHovered ? 1 : 1 - (toasts.length - 1 - i) * 0.4,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.15,
                ease: easeInOut,
              }}
              key={id}
              className={`toast-container-inner ${
                type && `toast-container-inner-${type}`
              }`}
            >
              <span className="toast-container-inner-text">{message}</span>

              <div
                className="toast-container-inner-close unselectable"
                onClick={() => removeToast(id)}
              >
                <img
                  className="toast-container-inner-close-icon"
                  src="/icons/e-remove_dark.svg"
                  alt=""
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ToastContainer;
