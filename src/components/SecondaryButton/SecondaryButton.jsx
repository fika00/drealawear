import "./SecondaryButton.scss";

const SecondaryButton = ({ text, onClick }) => {
  const onClickHandler = () => {
    if (typeof onClick === "function") {
      onClick();
    }
  };
  return (
    <div className="secondarybtn-container" onClick={onClickHandler}>
      <span className="secondarybtn-container-text">{text}</span>
    </div>
  );
};

export default SecondaryButton;
