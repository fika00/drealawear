import { Suspense, useEffect, useState } from "react";

import "./AnimatedSuspense.scss";
import { AnimatePresence, motion } from "framer-motion";

const LoaderCallback = ({ onChange }) => {
  useEffect(() => {
    onChange(true); // Signal loading starts

    return () => onChange(false); // Signal loading ends
  }, [onChange]);
  return null;
};

const AnimatedSuspense = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (value) => {
    setIsLoading(value);
  };

  useEffect(() => {}, [isLoading]);

  return (
    <>
      {/* The suspense block */}
      <Suspense fallback={<LoaderCallback onChange={onChangeHandler} />}>
        {children}
      </Suspense>

      {/* The loader animation */}
      <AnimatePresence>
        {isLoading && (
          <>
            <div
              style={{
                height: "100vh",
                width: "100%",
              }}
            ></div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "black",
              }}
              className="animatedloader-container"
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100vw",
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <video
                  muted
                  autoPlay
                  loop
                  playsInline
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  src="/loader.webm"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AnimatedSuspense;
