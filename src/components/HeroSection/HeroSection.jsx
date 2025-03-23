import { useNavigate } from "react-router-dom";
import LandingVideo from "../LandingVideo/LandingVideo";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import ScrollIndicator from "../ScrollIndicator/ScrollIndicator";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import { useFader } from "../utils/context";
import "./HeroSection.scss";

const HeroText = () => {
  const { toggleFader, hasAnimationFinished } = useFader();
  const navigate = useNavigate();

  const scrollInView = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      toggleFader(true);
      const firstTimeout = setTimeout(() => {
        element.scrollIntoView({
          behavior: "instant",
        });

        const timeout = setTimeout(() => {
          window.scrollBy({ top: 1, behavior: "smooth" });
          clearTimeout(timeout);
        }, 0);

        const lastTimeout = setTimeout(() => {
          toggleFader(false);

          clearTimeout(lastTimeout);
        }, 300);
        clearTimeout(firstTimeout);
      }, 300);
    }
  };

  const goToShop = () => {
    navigate("/catalogue");
  };

  return (
    <div className="herosection-container-inner">
      <span className="herosection-container-inner-text">
        Dreams feel so real lately.
      </span>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <PrimaryButton onClick={goToShop} text={"Catalogue"} />
        <SecondaryButton
          onClick={() => scrollInView("productSection")}
          text={"The shirts"}
        />
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className="herosection-container">
      <LandingVideo />
      <HeroText />

      <ScrollIndicator />
    </div>
  );
};

export default HeroSection;
