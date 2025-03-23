import "./LifestyleClubSectionVideo.scss";

import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import { useNavigate } from "react-router-dom";

const Hud = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/lifestyleform");
  };

  return (
    <div className="lifestyleclubsectionvideohud-container">
      <h1 className="lifestyleclubsectionvideohud-container-text playfair">
        Dreal lifestyle club
      </h1>
      {/* <PrimaryButton text={"Learn more"} /> */}
      <SecondaryButton onClick={onClickHandler} text={"Learn More."} />
    </div>
  );
};

const LifestyleClubSectionVideo = () => {
  return (
    <div className="dreallifestylevideo-container">
      <div className="dreallifestylevideo-container-inner">
        <video
          className="dreallifestylevideo-container-inner-video"
          src="Lifestyle.webm"
          autoPlay
          muted
          playsInline
          loop
        />
      </div>
      <Hud />
    </div>
  );
};

export default LifestyleClubSectionVideo;
