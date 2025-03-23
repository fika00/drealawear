import { useState } from "react";
import "./ShirtHero.scss";
import { cubicBezier, easeOut, motion } from "framer-motion";

const SlowAnimated = ({
  text,
  classname,
  duration = 1,
  splitType = "letters",
}) => {
  const letters = text.split(splitType === "letters" ? "" : " ");
  const cubicEase = cubicBezier(0.29, 0.35, 0.41, 0.98);

  return (
    <motion.div
      initial="initial"
      animate="visible"
      transition={{
        staggerChildren: 0.025,
      }}
      className="slowanimated-container"
    >
      {letters.map((letter, i) => (
        <motion.span
          variants={{
            initial: {
              opacity: 0,
              y: 100,
              rotate: "20deg",
            },
            visible: {
              y: 0,

              opacity: 1,
              rotate: "0",
            },
          }}
          style={{
            transformOrigin: "bottom left",
          }}
          transition={{
            duration: duration,
            ease: cubicEase,
          }}
          key={i}
          className={classname}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const ShirtHeroText = ({ data }) => {
  const colors = ["Jet black", "Off-White", "Sandstorm"];
  const icons = [
    "/icons/shirthero/1.svg",
    "/icons/shirthero/2.svg",
    "/icons/shirthero/3.svg",
  ];
  return (
    <div className="shirtherotext-container">
      <motion.div
        initial={{
          y: "100%",
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 0.1,
        }}
        className="shirtherotext-container-gradient"
      />
      <div className="shirtherotext-container-inner">
        <SlowAnimated
          classname={"shirtherotext-container-inner-shirtname playfair"}
          text={data.name}
        />
        <div className="shirtherotext-container-inner-colors">
          {colors.map((color, i) => (
            <SlowAnimated
              key={i}
              splitType="words"
              classname={"shirtherotext-container-inner-colors-text"}
              text={color}
            />
          ))}
        </div>
        <SlowAnimated
          classname={"shirtherotext-container-inner-text"}
          splitType="words"
          text={data.text}
        />
        <div className="shirtherotext-container-inner-iconscontainer">
          {icons.map((icon, i) => (
            <motion.img
              src={icon}
              key={i}
              className="shirtherotext-container-inner-iconscontainer-icon"
              alt="iconImg"
              initial={{
                y: "100%",
                opacity: 0,
              }}
              animate={{
                y: "0%",
                opacity: 1,
              }}
              transition={{
                delay: i * 0.1 + 0.4,
                duration: 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ShirtHero = ({
  onClick,
  isNavigating,
  isBehind,
  index,
  onHover,
  isMobile,
  data,
}) => {
  const [isHovered, setIsHovered] = useState(isMobile);

  const handleMouseOver = (value) => {
    if (!isMobile) {
      setIsHovered(value);
      onHover(value ? index : null);
    }
  };

  const onClickHandler = () => {
    onClick(index);
  };

  return (
    <div
      className={`shirthero-container ${
        isHovered ? "shirthero-container-hovered" : ""
      }
      ${isBehind ? "shirthero-container-behind" : ""}
      ${isNavigating ? "shirthero-container-exit" : ""}
      `}
      onMouseLeave={() => handleMouseOver(false)}
      onMouseEnter={() => handleMouseOver(true)}
      onClick={onClickHandler}
    >
      <img src={data.imgSrc} className={`shirthero-container-image`} alt="" />
      {isHovered && !isNavigating && <ShirtHeroText data={data} />}
    </div>
  );
};

export default ShirtHero;
