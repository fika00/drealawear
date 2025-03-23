import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Inner({ children, isCartOpen = true }) {
  const location = useLocation();

  const cartOpenStyles = {
    opacity: 0.5,
    scale: 0.95,
  };
  const scrollToTop = () => {
    document.documentElement.scrollIntoView({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  // useLayoutEffect(() => {
  //   const timeout = setTimeout(() => {
  //     scrollToTop()
  //     clearTimeout(timeout);
  //   }, 300);
  // }, [location.pathname]);

  return (
    <AnimatePresence onExitComplete={scrollToTop} mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0.1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
