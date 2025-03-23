import { useEffect, useRef, useState } from "react";
import ShirtSceneColorSwitcher from "../ShirtSceneColorSwitcher/ShirtSceneColorSwitcher";
import "./BottomRightCorner.scss";
import { useLenis } from "lenis/react";

const BottomRightCorner = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const interval = useRef();
  const element = useRef();

  const lenis = useLenis();

  const texts = [
    "Lifestyle Club Vol I",
    "Jet Black, Sandstorm, OffWhite",
    "Premium Material",
    "Endless style",
  ];

  const animateTop = (onComplete) => {
    const offsetTop =
      element.current.getBoundingClientRect().top + lenis.scroll;

    const scrollTarget = offsetTop;

    lenis.scrollTo(scrollTarget, {
      duration: 14,
      lerp: 1,
      easing: (t) => t,
      onComplete: onComplete,
    });
  };

  const animateBottom = (onComplete) => {
    const offsetTop =
      element.current.getBoundingClientRect().bottom + lenis.scroll;

    const scrollTarget = offsetTop - window.innerHeight;

    lenis.scrollTo(scrollTarget, {
      duration: 14,
      lerp: 1,
      easing: (t) => t,
      onComplete: onComplete,
    });
  };

  const animate = () => {
    if (element) {
      interval.current = setInterval(() => {
        animateTop(animateBottom);
      }, 28000);
    }
  };

  useEffect(() => {
    element.current = document.getElementById("productSection");
    console.log(document.getElementById("productSection"));
  }, []);

  useEffect(() => {
    console.log(isAnimating);
    if (isAnimating) {
      animateTop(animateBottom);
      animate();
    } else {
      clearInterval(interval.current);
      lenis?.stop();
      lenis?.start();
    }
  }, [isAnimating]);

  const animateHandler = () => {
    setIsAnimating((prev) => !prev);
  };

  return (
    <div className="bottomrightcorner-container">
      {texts.map((text, i) => (
        <span
          onClick={animateHandler}
          className="bottomrightcorner-container-text"
          key={i}
        >
          {text}
        </span>
      ))}
    </div>
  );
};

export default BottomRightCorner;
