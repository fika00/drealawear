import "./SideBarToggle.scss";
const SideBarToggle = ({ onChange, isHidden }) => {
  return (
    <div
      className={`sidebartoggle-container ${
        isHidden ? "sidebartoggle-container-hidden" : ""
      }`}
      onClick={onChange}
    >
      {isHidden ? "<" : ">"}
    </div>
  );
};

export default SideBarToggle;
