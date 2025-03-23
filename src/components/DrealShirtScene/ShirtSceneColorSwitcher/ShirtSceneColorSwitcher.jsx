import { useEffect, useState } from "react";
import { colorsWithHex } from "../../utils/colors";
import "./ShirtSceneColorSwitcher.scss";
import { useTransform, motion, useMotionValue, animate } from "framer-motion";
import isMobile from "../../utils/isMobile";

const ShirtSceneColorSwitcher = ({ scrollYProgress, onChange }) => {
  const [currentColor, setCurrentColor] = useState(0);
  const colors = [colorsWithHex[1], colorsWithHex[0], colorsWithHex[2]];

  const handleChange = (index) => {
    onChange(index);
  };

  const progress = useMotionValue(0);

  useEffect(() => {
    const handleSelected = (value) => {
      const shirt = Math.round(value * 2);
      setCurrentColor(shirt);
    };
    const unsub = scrollYProgress.on("change", handleSelected);

    return () => unsub();
  });

  useEffect(() => {
    animate(progress, (1 / 2) * currentColor, {
      ease: "easeInOut",
      duration: 0.3,
    });
  }, [currentColor]);

  return (
    <div className="shirtscenecolorswitcher-container">
      <motion.div
        style={{
          scaleX: isMobile ? progress : 1,
          scaleY: !isMobile ? progress : 1,
        }}
        className="shirtscenecolorswitcher-container-progress"
      ></motion.div>
      {colors.map(({ name, hex }, i) => (
        <div
          key={i}
          className="shirtscenecolorswitcher-container-colorbox-wrapper"
        >
          <div
            style={{
              backgroundColor: hex,
            }}
            onClick={() => handleChange(i)}
            className={`shirtscenecolorswitcher-container-colorbox ${
              i === currentColor
                ? "shirtscenecolorswitcher-container-colorbox-selected"
                : ""
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default ShirtSceneColorSwitcher;
