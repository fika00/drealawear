import "./ContentOverlay.scss";
const ContentOverlay = () => {
  return (
    <div className="contentoverlay-container">
      <img
        className="contentoverlay-container-logo"
        src="/logo_typo.svg"
        alt=""
      />
      <p className="contentoverlay-container-text">
        Bold designs for a daring lifestyle – elevate your every moment.
      </p>
      <div className="contentoverlay-container-right">
        <span className="contentoverlay-container-right-text">
          --Essentials
        </span>
        <span className="contentoverlay-container-right-text">--Elevate</span>
      </div>
    </div>
  );
};

export default ContentOverlay;
