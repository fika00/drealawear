import React, { createContext, useContext, useState } from "react";

const FaderContext = createContext();

export const FaderProvider = ({ children }) => {
  const [isFaderVisible, setIsFaderVisible] = useState(false);
  const [hasAnimationFinished, setHasAnimationFinished] = useState(false);
  const [development, setDevelopment] = useState(false);

  const toggleFader = (isVisible) => {
    setIsFaderVisible(isVisible);
  };

  const toggleAnimationFinished = (value) => setHasAnimationFinished(value);

  const setProduction = () => setDevelopment((prev) => !prev);

  return (
    <FaderContext.Provider
      value={{
        isFaderVisible,
        toggleFader,
        hasAnimationFinished,
        toggleAnimationFinished,
        development,
        setProduction,
      }}
    >
      {children}
    </FaderContext.Provider>
  );
};

// Custom hook to access the context
export const useFader = () => useContext(FaderContext);
