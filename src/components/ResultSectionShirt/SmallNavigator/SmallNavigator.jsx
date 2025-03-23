import { useEffect, useState } from "react";
import "./SmallNavigator.scss";

const SmallNavigator = ({ length, onChange }) => {
  const [current, setCurrent] = useState(0);

  const handleOnClick = (index) => {
    const forward = index > 0;

    setCurrent((prev) => {
      let next;
      if (prev + index >= length) {
        next = 0;
      } else if (prev + index < 0) {
        next = length - 1;
      } else {
        next = prev + index;
      }
      onChange(forward, next);
      return next;
    });
  };

  // useEffect(() => {
  //   onChange(current);
  // }, [current]);
  return (
    <div className="smallnavigator-container">
      <div
        onClick={() => handleOnClick(-1)}
        className="smallnavigator-container-button"
      >
        {"<"}
      </div>
      <div
        onClick={() => handleOnClick(1)}
        className="smallnavigator-container-button"
      >
        {">"}
      </div>
    </div>
  );
};

export default SmallNavigator;
