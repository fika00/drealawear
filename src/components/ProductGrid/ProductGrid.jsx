import { useEffect, useRef, useState } from "react";
import "./ProductGrid.scss";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  cubicBezier,
  easeIn,
} from "framer-motion";
import BackgroundColorCircle from "../BackgroundColorCircle/BackgroundColorCircle";
import ProductGridElementnfo from "../ProductGridElementnfo/ProductGridElementnfo";
import isMobile from "../utils/isMobile";

const GirdElement = ({ index, image, onHover, isHovered }) => {
  const [isClicked, setIsClicked] = useState(false);
  const divRef = useRef(null);

  const cubicEase = cubicBezier(0.4, 0.12, 0.17, 1);

  const handleClick = () => {
    if (!isClicked) {
      onHover(image);
    } else {
      onHover(null);
    }
    setIsClicked((prev) => !prev);
  };

  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-20, 20], {
    ease: cubicEase,
  });

  return (
    <motion.div
      className={`gridelement-container ${
        isHovered !== null
          ? isHovered
            ? "gridelement-container-hovered"
            : "gridelement-container-hovered-background"
          : ""
      }`}
      ref={divRef}
    >
      <div className="gridelement-container-imgwrapper">
        <motion.img
          style={{
            y,
          }}
          className="gridelement-container-imgwrapper-img"
          src={image.src}
          onClick={handleClick}
          alt=""
        />
      </div>
      <div className="gridelement-container-info">
        <div className="gridelement-container-info-left">
          <span>{image.place}</span>
        </div>
        <div className="gridelement-container-info-right">
          <span>{image.coords}</span>
        </div>
      </div>
      {/* <ProductGridElementnfo isOpen={isClicked} data={image} /> */}
    </motion.div>
  );
};

const GridRow = ({ index, row, isOffset, rowY, onHover, currentHovered }) => {
  return (
    <motion.div
      className={`gridrow-container ${
        isOffset ? "gridrow-container-offset" : ""
      }`}
      style={{
        y: rowY,
      }}
    >
      {row.map((img, i) => (
        <GirdElement
          isHovered={currentHovered ? currentHovered?.src === img.src : null}
          index={index}
          onHover={onHover}
          key={i}
          image={img}
        />
      ))}
    </motion.div>
  );
};

const Header = () => {
  return (
    <div className="productgrid-header">
      <h1 className="productgrid-header-text">Behind the shirt</h1>
      <span className="productgrid-header-under">
        (Explore the story behind it all)
      </span>
    </div>
  );
};

const ProductGrid = ({ images }) => {
  const [currentHovered, setCurrentHovered] = useState(null);

  const chunkSize = Math.ceil(images.length / 2);
  const grid1 = images.slice(0, chunkSize);
  const grid2 = images.slice(chunkSize, chunkSize * 2);

  const divRef = useRef(null);

  const handleOnHover = (data) => {
    setCurrentHovered(data);
  };

  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ["start end", "end start"],
  });
  const rowY = useTransform(scrollYProgress, [0, 0.6, 1], [100, 0, -100], {
    ease: easeIn,
  });

  const rows = [grid1, grid2];

  return (
    <div className="productgrid-container" ref={divRef}>
      <Header />
      {/* <BackgroundColorCircle data={currentHovered} /> */}
      <div className="productgrid-container-inner">
        {rows.map((row, i) => (
          <GridRow
            key={i}
            row={row}
            index={i}
            rowY={rowY}
            currentHovered={currentHovered}
            scrollYProgress={scrollYProgress}
            isOffset={i % 2 === 0}
            onHover={handleOnHover}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
