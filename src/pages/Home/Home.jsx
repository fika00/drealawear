import "./Home.scss";
import Accordion from "../../components/Accordion/Accordion";
import DrealAnimation from "../../components/DrealAnimation/DrealAnimation";
import HeroSection from "../../components/HeroSection/HeroSection";
import LandingVideo from "../../components/LandingVideo/LandingVideo";
import MessageSection from "../../components/MessageSection/MessageSection";
import BackgroundColorSwitcher from "../../components/BackgroundColorSwitcher/BackgroundColorSwitcher";
import { useRef } from "react";

import ProcessSection from "../../components/ProcessSection/ProcessSection";
import ResultsSection from "../../components/ResultsSection/ResultsSection";
import PackageScene from "../../components/PackageScene/PackageScene";
import ResultZoom from "../../components/ResultZoom/ResultZoom";
import LifestyleClubSection from "../../components/LifestyleClubSection/LifestyleClubSection";
import ProductContentStack from "../../components/ProductContentStack/ProductContentStack";
import ResultSectionShirt from "../../components/ResultSectionShirt/ResultSectionShirt";
import LifestyleClubSectionGrid from "../../components/LifestyleClubSectionGrid/LifestyleClubSectionGrid";
import LifestyleClubSectionVideo from "../../components/LifestyleClubSectionVideo/LifestyleClubSectionVideo";
import AboutDreal from "../../components/AboutDreal/AboutDreal";
import AboutProductHomeSection from "../../components/AboutProductHomeSection/AboutProductHomeSection";
import AboutProductHomeFull from "../../components/AboutProductHomeFull/AboutProductHomeFull";
import isMobile from "../../components/utils/isMobile";
import StretchText from "../../components/TestingHeight/StretchText";
import AboutProductStory from "../../components/AboutProductStory/AboutProductStory";
const Home = () => {
  const messageSection = useRef();

  const handleSetRef = (element) => {
    messageSection.current = element;
  };
  return (
    <div className="home-container">
      <HeroSection />
      {/* <ProductContentStack /> */}
      {/* <DrealAnimation /> */}
      {/* <Accordion /> */}
      {/* <PackageScene reversed /> */}

      <AboutDreal />

      {/* <AboutProductStory /> */}
      {false ? <AboutProductHomeSection /> : <AboutProductHomeFull />}
      <div ref={messageSection}>
        {/* <MessageSection onLoad={handleSetRef} /> */}
        <ProcessSection />
        {/* <ResultsSection /> */}

        {/* <ResultZoom /> */}
        {/* <PackageScene /> */}

        <ResultSectionShirt />
      </div>
      <ResultZoom />

      <PackageScene />

      {/* <LifestyleClubSection /> */}
      {/* <LifestyleClubSectionGrid /> */}
      <LifestyleClubSectionVideo />

      {/* <StretchText /> */}

      {/* <BackgroundColorSwitcher messageSection={messageSection} /> */}
    </div>
  );
};

export default Home;
