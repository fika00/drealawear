import { useState } from "react";
import "./ColorSelector.scss";
import { colors as colorCodes } from "../utils/colors";
import { motion } from "framer-motion";
const ColorBox = ({
  color,
  onClick,
  index,
  isSelected = false,
  isInStock = false,
}) => {
  return (
    <motion.div
      initial="initial"
      whileHover="visible"
      className="colorbox-container"
    >
      <div
        className={`colorbox-container-inner ${
          isSelected ? "colorbox-container-inner-selected" : ""
        }
        ${!isInStock ? "colorbox-container-inner-disabled" : ""}`}
        style={{
          backgroundColor: color.color,
        }}
        onClick={() => onClick(index)}
      ></div>
      {!isInStock && (
        <motion.div
          variants={{
            initial: {
              y: "100%",
              opacity: 0,
            },
            visible: {
              y: "0%",
              opacity: 1,
            },
          }}
          className="sizebox-container-notinstock"
        >
          <span className="sizebox-container-notinstock-text">
            Not in stock.
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

const ColorSelector = ({ onChange, availability = [0, 1, 2] }) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const colors = [
    {
      name: colorCodes[0],
      color: "#000000",
    },
    { name: colorCodes[1], color: "#ffffff" },
    { name: colorCodes[2], color: "#be9b7b" },
  ];

  const onClickHandler = (index) => {
    setSelectedSize(index);
    onChange(index);
  };

  return (
    <div className="colorselector-container">
      <div className="colorselector-container-header">
        <span className="colorselector-container-header-text">
          color:{" "}
          <span className="colorselector-container-header-text colorselector-container-header-text-bolded">
            {colors[selectedSize].name}
          </span>
        </span>
      </div>
      <div className="colorselector-container-sizebox">
        {colors.map((color, i) => (
          <ColorBox
            isSelected={i === selectedSize}
            key={i}
            color={color}
            onClick={onClickHandler}
            index={i}
            isInStock={availability?.includes(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
