import { useEffect, useRef, useState } from "react";
import "./StretchText.scss";

const StretchText = ({ children, type = "serif", text, classname }) => {
  const [scale, setScale] = useState({ x: 1, y: 1 });

  const parentRef = useRef();
  const textWrapperRef = useRef();

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    const handleResize = () => {
      const { width: parentWidth, height: parentHeight } =
        parentRef.current.getBoundingClientRect();
      const { width: textWrapperWidth, height: textWrapperHeight } =
        textWrapperRef.current.getBoundingClientRect();

      setScale({
        x: parentWidth / textWrapperWidth,
        y: parentHeight / textWrapperHeight,
      });
    };

    const debouncedHandleResize = debounce(handleResize, 35);

    handleResize();

    window.addEventListener("resize", debouncedHandleResize);

    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  return (
    <div className="stretchtext-container" ref={parentRef}>
      <div className="stretchtext-container-textwrapper" ref={textWrapperRef}>
        {!children ? (
          <span
            style={{
              scale: `${scale.x} ${scale.y}`,
            }}
            className={`stretchtext-container-textwrapper-text stretchtext-container-textwrapper-text-seriffix playfair ${classname} ${
              type === "sans"
                ? "stretchtext-container-textwrapper-text-sans"
                : ""
            }`}
          >
            {text}
          </span>
        ) : (
          <div
            style={{
              scale: `${scale.x} ${scale.y}`,
            }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default StretchText;
