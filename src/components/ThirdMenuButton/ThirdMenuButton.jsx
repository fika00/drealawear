import "./ThirdMenuButton.scss";

const ThirdMenuButton = ({
  isLightSkin = false,
  wide,
  onClick,
  text,
  color,
  enabled = true,
}) => {
  const onClickHandler = () => {
    if (typeof onClick === "function" && enabled) {
      onClick();
    }
  };
  return (
    <div
      onClick={onClickHandler}
      className={`thirdmenubutton-container ${
        wide ? "thirdmenubutton-container-wide" : ""
      }
      ${isLightSkin ? "thirdmenubutton-container-light" : ""}
      unselectable
      ${!enabled ? "thirdmenubutton-container-disabled" : ""}
      `}
      style={{
        backgroundColor: color,
      }}
    >
      <span className="thirdmenubutton-container-text">{text}</span>
    </div>
  );
};

export default ThirdMenuButton;
