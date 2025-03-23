import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./SizeSelector.scss";

const SizeBox = ({
  size,
  onClick,
  index,
  isSelected = false,
  isInStock = false,
}) => {
  return (
    <motion.div
      className={`sizebox-container ${
        !isInStock ? "sizebox-container-disabled" : ""
      }`}
      initial="initial"
      whileHover="visible"
    >
      <div
        className={`sizebox-container-inner ${
          isSelected ? "sizebox-container-inner-selected" : ""
        }`}
        onClick={() => onClick(index)}
      >
        <span className="sizebox-container-text">{size}</span>

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
      </div>
    </motion.div>
  );
};

const SizeSelector = ({ onChange, currentInstances }) => {
  const [selectedSize, setSelectedSize] = useState(1);
  const sizes = ["S", "M", "L", "XL"];

  const onClickHandler = (index) => {
    setSelectedSize(index);
  };

  useEffect(() => {
    onChange(sizes[selectedSize]);
  }, [selectedSize]);

  useEffect(() => {}, [currentInstances]);

  return (
    <div className="sizeselector-container">
      <div className="sizeselector-container-header">
        <span className="sizeselector-container-header-text">
          size:{" "}
          <span className="sizeselector-container-header-text sizeselector-container-header-text-bolded">
            {sizes[selectedSize]}
          </span>
        </span>
      </div>
      <div className="sizeselector-container-sizebox">
        {sizes.map((size, i) => (
          <SizeBox
            isSelected={i === selectedSize}
            key={i}
            size={size}
            isInStock={currentInstances && currentInstances[i]?.isInStock}
            onClick={onClickHandler}
            index={i}
          />
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
