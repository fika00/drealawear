import { useEffect, useRef, useState } from "react";
import ProductLanding from "../../components/ProductLanding/ProductLanding";
import ProductSidebar from "../../components/ProductSidebar/ProductSidebar";
import "./ProductPage.scss";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import SheetTop from "../../components/SheetTop/SheetTop";
import { useScroll, motion, useTransform } from "framer-motion";
import { easeIn } from "framer-motion/dom";
import drealWhite from "/cataloguepics/dreal/dreal-white.webp";
import drealCappuchino from "/cataloguepics/dreal/dreal-cappuchino.webp";
import drealBlack from "/cataloguepics/dreal/dreal-black.webp";

import lifestyleWhite from "/cataloguepics/lifestyle/lifestyle-white.webp";
import lifestyleBlack from "/cataloguepics/lifestyle/lifestyle-black.webp";
// import lifestyleBlack from "/cataloguepics/lifestyle/lifestyle-black_2.webp";
import lifestyleCappuchino from "/cataloguepics/lifestyle/lifestyle-cappuchino.webp";
import ProductBold from "../../components/ProductBold/ProductBold";
import ProductBoldSection from "../../components/ProductBoldSection/ProductBoldSection";
import ProductContentStack from "../../components/ProductContentStack/ProductContentStack";
import TopSlashTransition from "../../components/TopSlashTransition/TopSlashTransition";
import ProductContentRow from "../../components/ProductContentRow/ProductContentRow";
import ProductLineContent from "../../components/ProductLineContent/ProductLineContent";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { colors } from "../../components/utils/colors";
import { api, version } from "../../components/utils/api";
import { useToast } from "../../components/utils/ToastContext";
import { getFitIndex } from "../../components/utils/Fits";
import { getShirtGridData } from "../../components/utils/misc";

const ProductPage = () => {
  const [currentColor, setCurrentColor] = useState(0);
  const [currentSize, setCurrentSize] = useState(0);
  const [currentBcakgroundColor, setCurrentBcakgroundColor] =
    useState("#d7d7d7");
  const [currentInstances, setCurrentInstances] = useState([]);
  const [currentSelectedInstance, setCurrentSelectedInstance] = useState(null);

  const [isCurrentSelectedAvailable, setIsCurrentSelectedAvailable] =
    useState(false);
  const parentDiv = useRef(null);
  const { addToast } = useToast();
  const { shirt } = useParams();

  const getShirtProductId = (shirt) => {
    return shirt === "lifestyle"
      ? "34a0a423-05e7-4a6b-9c85-e4785c9fcc3d"
      : "c1e9e21e-5500-416d-ae7b-5f0765ef5169";
  };

  const isAvailable = (color, size) => {
    if (!currentInstances.length) return false; // Add early return if no instances

    const fitIndex = getFitIndex(size);
    const item = currentInstances.find(
      (e) => e.fit === fitIndex && e.productColor === color
    );
    return !!item?.isInStock; // Ensure boolean return
  };

  const onColorChangeHandler = (value) => {
    setCurrentColor(value);
  };

  const onSizeChangeHandler = (value) => {
    setCurrentSize(value);
  };

  const { scrollYProgress } = useScroll({
    target: parentDiv,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.95, 0.85]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "20px"]);
  const y = useTransform(scrollYProgress, [0, 0.15, 1], [0, 0, -400], {
    ease: easeIn,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.3]);

  const data = {
    lifestyle: {
      name: "Lifestyle Club",
      text: '-- The "Dreal Lifestyle Club" t-shirt symbolizes the connection of like-minded individuals who blend dreams with reality. It represents a community united by shared visions, ambitions, and authentic connections—a badge for those who live with purpose and embrace a collective mindset.',
      slogan: "United by the dream.",
      images: [lifestyleBlack, lifestyleWhite, lifestyleCappuchino],
      grid: getShirtGridData(currentColor, shirt),
    },
    dreal: {
      name: "Dreal Blueprint",
      text: '-- Your vision is the starting point. The geometric design symbolises the path from dreams to achievement, reminding you that each step brings your goals closer. Wear it as a symbol of your journey and a reminder to live boldly and create freely, wherever life takes you."',
      slogan: "United by the dream.",
      images: [drealBlack, drealWhite, drealCappuchino],
      grid: getShirtGridData(currentColor, shirt),
    },
  };

  const images = {
    dreal: [
      {
        back: "/cataloguepics/dreal/stackImages/1.webp",
        front: "/cataloguepics/dreal/stackImages/1_front.webp",
      },
      {
        back: "/cataloguepics/dreal/stackImages/2.webp",
        front: "/cataloguepics/dreal/stackImages/2_front.webp",
      },
      {
        back: "/cataloguepics/dreal/stackImages/3.webp",
        front: "/cataloguepics/dreal/stackImages/3_front.webp",
      },
      {
        back: "/cataloguepics/dreal/stackImages/5.webp",
        front: "/cataloguepics/dreal/stackImages/5_front.webp",
      },
      {
        back: "/cataloguepics/dreal/stackImages/4.webp",
        front: "/cataloguepics/dreal/stackImages/4_front.webp",
      },
    ],
    lifestyle: [
      {
        back: "/cataloguepics/lifestyle/stackImages/7.webp",
        front: "/cataloguepics/lifestyle/stackImages/7_front.webp",
      },
      {
        back: "/cataloguepics/lifestyle/stackImages/8.webp",
        front: "/cataloguepics/lifestyle/stackImages/8_front.webp",
      },

      {
        back: "/cataloguepics/lifestyle/stackImages/10.webp",
        front: "/cataloguepics/lifestyle/stackImages/10_front.webp",
      },
      {
        back: "/cataloguepics/lifestyle/stackImages/11.webp",
        front: "/cataloguepics/lifestyle/stackImages/11_front.webp",
      },
      {
        back: "/cataloguepics/lifestyle/stackImages/12.webp",
        front: "/cataloguepics/lifestyle/stackImages/12_front.webp",
      },
    ],
  };

  const currentData = shirt === "lifestyle" ? data.lifestyle : data.dreal;
  const currentStackImages =
    shirt === "lifestyle" ? images.lifestyle : images.dreal;

  
  return (
    <div className="productpage-container">
      <div
        style={{
          position: "relative",
        }}
      >
        <div
          className="productpage-container-scrollHitbox"
          ref={parentDiv}
        ></div>
        <motion.div
          style={{
            scale,
            borderRadius: borderRadius,
            y,
            opacity,
          }}
          className="productpage-container-herowrapper"
        >
          <ProductLanding data={currentData} currentImage={currentColor} />
          <ProductSidebar
            currentSelectedColor={currentColor}
            isCurrentSelectedAvailable={isCurrentSelectedAvailable ? isCurrentSelectedAvailable : false}
            data={currentData}
            currentInstances={currentInstances}
            onColorChange={onColorChangeHandler}
            onSizeChange={onSizeChangeHandler}
          />
        </motion.div>
        <div className="productpage-container-below">
          <SheetTop bgColor={currentBcakgroundColor} />
          <ProductGrid images={currentData.grid} />
        </div>
      </div>
      <ProductBoldSection
        gridImgs={currentData.grid}
        bgColor={currentBcakgroundColor}
        shirt={shirt}
      />

      <ProductLineContent gridImgs={currentData.grid} />

      <TopSlashTransition />
      <ProductContentStack images={currentStackImages} />
      <div
        style={{
          width: "100%",
          height: "25vh",
          backgroundColor: "#101010",
        }}
      ></div>
    </div>
  );
};

export default ProductPage;
