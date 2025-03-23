import "./RadioButton.scss";

const RadioButton = ({ isSelected }) => {
  return (
    <div className="radiobutton-container">
      <div
        className={`radiobutton-container-inner ${
          isSelected ? "radiobutton-container-inner-selected" : ""
        }`}
      ></div>
    </div>
  );
};

export default RadioButton;
