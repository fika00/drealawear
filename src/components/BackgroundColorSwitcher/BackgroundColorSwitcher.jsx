import { useInView } from "framer-motion";
import { forwardRef, useEffect, useRef } from "react";
import bgColor from "../backgroundcolor";

const BackgroundColorSwitcher = ({ messageSection }) => {
  const isInBox = useInView(messageSection, {
    margin: "-45%",
  });

  useEffect(() => {
    if (isInBox) {
      // document.body.style.backgroundColor = "#26282B";
      document.body.style.backgroundColor = bgColor;
    } else {
      document.body.style.backgroundColor = "#d7d7d7";
    }
  }, [isInBox]);
  return null;
};

export default BackgroundColorSwitcher;
