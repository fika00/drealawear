import "./PrimaryButton.scss";

const PrimaryButton = ({ onClick, text }) => {
  const onClickHandler = () => {
    if (typeof onClick === "function") {
      onClick();
    }
  };
  return (
    <div onClick={onClickHandler} className="primarybutton">
      <span className="primarybutton-text">{text}</span>
    </div>
  );
};

export default PrimaryButton;
