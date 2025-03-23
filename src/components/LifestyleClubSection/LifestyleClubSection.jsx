import { useRef } from "react";
import "./LifestyleClubSection.scss";
import { useScroll, motion, useTransform } from "framer-motion";

const Media = ({ src }) => {
  return (
    <div className="rowmedia-container">
      <img className="rowmedia-container-image" src={src} alt="" />
    </div>
  );
};

const ContentRow = ({ count, scrollYProgress, forward }) => {
  const media = [
    "/clubPics/1.webp",
    "/clubPics/2.webp",
    "/clubPics/3.webp",
    "/clubPics/4.webp",
    "/clubPics/5.webp",
    "/clubPics/6.webp",
    "/clubPics/7.webp",
  ];

  const x = useTransform(scrollYProgress, [0, 1], [0, forward ? 100 : -100]);

  const iterator = Array.from(Array(count).keys());
  return (
    <motion.div
      style={{
        x,
      }}
      className="contentrow-container"
    >
      {iterator.map((image, i) => (
        <Media key={i} src={media[Math.floor(Math.random() * media.length)]} />
      ))}
    </motion.div>
  );
};

const LifestyleClubSection = () => {
  const divRef = useRef(null);
  const rowCount = 5;
  const iterator = Array.from(Array(rowCount).keys());

  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ["start end", "end end"],
  });
  return (
    <div ref={divRef} className="lifestyleclubsection-container">
      <div className="lifestyleclubsection-container-inner">
        {iterator.map((row, i) => (
          <ContentRow
            forward={i % 2 === 0}
            scrollYProgress={scrollYProgress}
            count={5}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default LifestyleClubSection;
