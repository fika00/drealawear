import { useState } from "react";
import ShirtHero from "../../components/ShirtHero/ShirtHero";
import "./Shirts.scss";

import drealWhite from "/cataloguepics/dreal/dreal-white.webp";
import lifestyleWhite from "/cataloguepics/lifestyle/lifestyle-white.webp";

import { useNavigate } from "react-router-dom";
import isMobile from "../../components/utils/isMobile";

const Shirts = () => {
  const [currentHovered, setCurrentHovered] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const navigate = useNavigate();

  const shirtInfo = [
    {
      name: "LifestyleClub Vol I",
      text: "Be a part of something great.",
      imgSrc: lifestyleWhite,
    },
    {
      name: "Dreal Blueprint",
      text: "The unique ones make a difference.",
      imgSrc: drealWhite,
    },
  ];

  const onHoverHandler = (value) => {
    setCurrentHovered(value);
  };

  const Navigate = (product) => {
    setIsNavigating((prev) => !prev);
    const timeout = setTimeout(() => {
      navigate(`/catalogue/${product === 0 ? "lifestyle" : "dreal"}`);
      clearTimeout(timeout);
    }, 700);
  };
  return (
    <div className="shirtcatalogue-container">
      {shirtInfo.map((shirt, i) => (
        <ShirtHero
          isBehind={currentHovered != null && currentHovered != i}
          onHover={onHoverHandler}
          isNavigating={isNavigating}
          data={shirt}
          key={i}
          index={i}
          isMobile={isMobile}
          onClick={Navigate}
        />
      ))}
    </div>
  );
};

export default Shirts;
