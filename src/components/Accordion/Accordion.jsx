import { useEffect, useRef, useState } from "react";
import "./Accordion.scss";

import { animate, easeInOut, motion, useMotionValue } from "framer-motion";
import TileInfo from "./TileInfo/TileInfo";
import isMobile from "../utils/isMobile";

const Tile = ({ width, index, data, isExpanded, onClick, height }) => {
  const onClickHandler = () => {
    onClick(index);
  };
  return (
    <motion.div
      onClick={onClickHandler}
      className="tile-container"
      style={{
        width,
        height,
      }}
    >
      <img
        loading="lazy"
        className={`tile-container-image ${
          isExpanded ? "tile-container-image-expanded" : ""
        } `}
        src={data.src}
        alt="TileImage"
      />

      <TileInfo isExpanded={isExpanded} data={data} />
    </motion.div>
  );
};

const Accordion = () => {
  const [currentSelected, setCurrentSelected] = useState(3);
  const [containerWidth, setContainerWidth] = useState(0); // Store the calculated width here
  const shuffleInterval = useRef();
  const [hasInteracted, setHasInteracted] = useState(false);
  const divRef = useRef();

  const tileWidth = !isMobile ? 900 : 300;
  const tileHeight = !isMobile ? 600 : 200;

  const tiles = [
    {
      src: "/accordionpics/1.webp",
      coords: "42.515043, 19.772930",
      place: "Prokletije",
      country: "Montenegro",
      date: "21.10.2024.",
    },
    {
      src: "/accordionpics/2.webp",
      coords: "42.511791, 19.834866",
      place: "The Eye",
      country: "Montenegro",
      date: "22.10.2024.",
    },
    {
      src: "/accordionpics/3.webp",
      coords: "44.791304, 20.426101",
      place: "Belgrade",
      country: "Serbia",
      date: "21.09.2024.",
    },
    {
      src: "/accordionpics/4.webp",
      coords: "44.787278, 20.421925",
      place: "Belgrade",
      country: "Serbia",
      date: "21.09.2024.",
    },
    {
      src: "/accordionpics/5.webp",
      coords: "44.787278, 20.421925",
      place: "Belgrade",
      country: "Serbia",
      date: "21.09.2024.",
    },
    {
      src: "/accordionpics/6.webp",
      coords: "44.791304, 20.426101",
      place: "Belgrade",
      country: "Serbia",
      date: "21.09.2024.",
    },
  ];

  const onClickHandler = (index) => {
    setCurrentSelected(index);
    setHasInteracted(true);
  };

  const handleResize = () => {
    if (divRef.current) {
      setContainerWidth(divRef.current.offsetWidth);
    }
  };

  const shuffleAccordion = () => {
    setCurrentSelected((prev) => {
      return prev + 1;
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    shuffleInterval.current = setInterval(() => {
      shuffleAccordion();
    }, 3000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(shuffleInterval.current);
    };
  }, []);

  useEffect(() => {
    if (hasInteracted) {
      clearInterval(shuffleInterval.current);
    }
  }, [hasInteracted]);

  const startOffset = !isMobile ? 100 : 30;

  const gaps = 1;

  const startPoint =
    ((tiles.length / 2) * (tileWidth + gaps) - startOffset) * -1;
  const x = useMotionValue(startPoint);

  const animOptions = {
    duration: 1,
    ease: easeInOut,
  };

  useEffect(() => {
    const midPoint = tiles.length / 2;
    const totalTiles = tiles.length;

    if (
      currentSelected >= midPoint &&
      currentSelected < totalTiles + midPoint
    ) {
      animate(
        x,
        startPoint + (midPoint - currentSelected) * (tileWidth + gaps),
        animOptions
      );
    } else if (currentSelected >= totalTiles + midPoint) {
      animate(
        x,
        startPoint + (midPoint - currentSelected) * (tileWidth + gaps),
        {
          onComplete: () => {
            x.set(startPoint);
            setCurrentSelected(midPoint);
          },
          ...animOptions,
        }
      );
    } else if (currentSelected < midPoint) {
      x.set(startPoint + (midPoint - 9) * (tileWidth + gaps));

      animate(x, startPoint + (midPoint - 9 + 1) * tileWidth, {
        onComplete: () => setCurrentSelected(totalTiles + midPoint - 1),
        ...animOptions,
      });
    }
  }, [currentSelected]);

  const isExpandedEvery = (index) => {
    const condition =
      index === currentSelected || index === currentSelected - tiles.length;

    return condition;
  };

  return (
    <div className="accordion-container">
      <motion.div
        style={{
          x,
          // scale: 0.5,
        }}
        className="accordion-container-inner"
        ref={divRef}
      >
        {tiles.map((tile, i) => (
          <Tile
            height={tileHeight}
            width={tileWidth}
            onClick={onClickHandler}
            index={i}
            key={i}
            data={tile}
            isExpanded={isExpandedEvery(i)}
          />
        ))}
        {tiles.map((tile, i) => {
          const currentIndex = i + tiles.length;

          return (
            <Tile
              height={tileHeight}
              width={tileWidth}
              onClick={onClickHandler}
              index={currentIndex}
              key={currentIndex}
              data={tile}
              isExpanded={isExpandedEvery(i)}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default Accordion;
