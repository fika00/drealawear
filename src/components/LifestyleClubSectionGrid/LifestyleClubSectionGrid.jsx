import { useEffect, useRef, useState } from "react";
import "./LifestyleClubSectionGrid.scss";
import {
  useScroll,
  motion,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

const Hud = () => {
  return (
    <div className="lifestyleclubsectionhud-container">
      <h1 className="lifestyleclubsectionhud-container-text playfair">
        Dreal lifestyle club
      </h1>
      <PrimaryButton text={"Learn more"} />
    </div>
  );
};

const Element = ({ data }) => {
  return (
    <div
      className={`dreallifestylegrid-container-element ${
        data.src.length > 1 ? "dreallifestylegrid-container-element-grid" : ""
      }`}
    >
      {data.src.map((element, i) => {
        return (
          <div
            key={i}
            className={`dreallifestylegrid-container-element-img-wrapper ${
              i % 2 !== 0
                ? "dreallifestylegrid-container-element-img-wrapper-tall"
                : ""
            }`}
          >
            <img
              src={element}
              className="dreallifestylegrid-container-element-img"
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
};

const LifestyleClubSectionGrid = () => {
  const divRef = useRef(null);

  const innerRef = useRef();

  const [innerWidth, setInnerWidth] = useState(0);

  const media = [
    {
      src: ["/clubPics/1.webp"],
    },
    { src: ["/clubPics/2.webp", "/clubPics/3.webp", "/clubPics/4.webp"] },
    { src: ["/clubPics/5.webp"] },
    { src: ["/clubPics/6.webp", "/clubPics/7.webp", "/clubPics/7.webp"] },
    {
      src: ["/clubPics/1.webp"],
    },
    { src: ["/clubPics/2.webp", "/clubPics/3.webp", "/clubPics/4.webp"] },
    { src: ["/clubPics/5.webp"] },
    { src: ["/clubPics/6.webp", "/clubPics/7.webp", "/clubPics/7.webp"] },
  ];

  const x = useMotionValue(0);

  const animateX = () => {
    animate(x, -innerWidth / 2, {
      duration: 50,
      ease: "linear",
      onComplete: () => {
        x.set(0);
        animateX();
      },
    });
  };

  useEffect(() => {
    const handleResize = (width) => {
      if (innerRef.current) {
        const innerWidth = innerRef.current.scrollWidth;
        setInnerWidth(innerWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (innerWidth !== 0) animateX();
  }, [innerWidth]);

  return (
    <div ref={divRef} className="dreallifestylegrid-container">
      <motion.div
        style={{
          x,
        }}
        className="dreallifestylegrid-container-inner"
        ref={innerRef}
      >
        {media.map((pic, i) => (
          <Element data={pic} key={i} />
        ))}
      </motion.div>
      <Hud />
    </div>
  );
};

export default LifestyleClubSectionGrid;
