import { useEffect, useRef, useState } from "react";
import "./InputField.scss";
const InputField = ({ onChange, text, inputData }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [labelWidth, setLabelWidth] = useState();
  const labelRef = useRef();

  const onChangeHandler = (val) => {
    if (typeof onChange === "function") {
      onChange(val);
    }
  };

  // useEffect(() => {
  //   const { width } = labelRef.current.getBoundingClientRect();
  //   setLabelWidth(width);
  // }, [text]);
  return (
    <div
      className={`inputfield-container ${
        isFocused ? "inputfield-container-focused" : ""
      }`}
    >
      {!text && (
        <label
          ref={labelRef}
          className={`inputfield-container-label`}
          // style={{
          //   left:
          //     isFocused || text !== ""
          //       ? `calc(100% - ${labelWidth}px - 20px)`
          //       : "10px",
          // }}
          htmlFor={inputData?.name}
        >
          {inputData?.name}
        </label>
      )}
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChangeHandler(e.target.value)}
        {...inputData}
        className="inputfield-container-input"
      />
    </div>
  );
};

export default InputField;
