import { useEffect, useRef, useState } from "react";
import "./SecondaryInputField.scss";
const SecondaryInputField = ({ onChange, text, inputData, isUnanswered }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [labelWidth, setLabelWidth] = useState();
  const labelRef = useRef();

  const onChangeHandler = (val) => {
    if (typeof onChange === "function") {
      onChange(val);
    }
  };

  useEffect(() => {
    const { width } = labelRef.current.getBoundingClientRect();
    setLabelWidth(width);
  }, [text]);
  return (
    <div
      className={`secondaryinput-container ${
        isFocused ? "secondaryinput-container-focused" : ""
      }
      ${isUnanswered ? "secondaryinput-container-unanswered" : ""}
      `}
    >
      <label
        ref={labelRef}
        className={`secondaryinput-container-label`}
        style={{
          left:
            isFocused || text !== ""
              ? `calc(100% - ${labelWidth}px - 20px)`
              : "10px",
        }}
        htmlFor={inputData?.name}
      >
        {inputData?.name}
      </label>

      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChangeHandler(e.target.value)}
        {...inputData}
        className="secondaryinput-container-input"
      />
    </div>
  );
};

export default SecondaryInputField;
