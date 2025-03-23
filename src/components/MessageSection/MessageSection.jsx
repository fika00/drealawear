import { useEffect, useRef } from "react";
import "./MessageSection.scss";
import { motion, useScroll, useTransform } from "framer-motion";
import isMobile from "../utils/isMobile";
import AtoB from "../AtoB/AtoB";

const FloatingImage = ({ data, index, scrollYProgress, normalizedSegment }) => {
  const startX = !isMobile ? 120 : 10;
  const endX = !isMobile ? 0 : 50;

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    data?.side === "left"
      ? [-startX * normalizedSegment * (index + 1), endX]
      : [startX * normalizedSegment * (index + 1), -endX]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [70 * (4 - normalizedSegment * (index + 1)), -70]
  );

  return (
    <div className={data.className}>
      <div
        className={`${data.className}-inner`}
        style={{
          position: "relative",
        }}
      >
        <motion.img
          style={{
            x,
            y,
          }}
          src={data.src}
          alt=""
          className="messagecontent-container-img"
        />
      </div>
    </div>
  );
};

const MessageContent = ({ scrollYProgress }) => {
  const media = [
    {
      src: "/cataloguepics/dreal/grid/6.webp",
      className: "messagecontent-container-lefttop",
      side: "left",
    },
    {
      src: "/cataloguepics/lifestyle/grid/7.webp",
      className: "messagecontent-container-righttop",
      side: "right",
    },
    {
      src: "/messsagePics/1.webp",
      className: "messagecontent-container-bottomleft",
      side: "left",
    },
    {
      src: "/clubPics/5.webp",
      className: "messagecontent-container-rightbottom",
      side: "right",
    },
  ];

  const normalizedSegment = 1 / media.length;

  return (
    <div className="messagecontent-container">
      <img
        src="/messsagePics/3.webp"
        alt=""
        className="messagecontent-container-middle"
      />
      {media.map((data, i) => (
        <FloatingImage
          index={i}
          normalizedSegment={normalizedSegment}
          scrollYProgress={scrollYProgress}
          key={i}
          data={data}
        />
      ))}
    </div>
  );
};

const MessageHeaders = ({ y, header, text, className }) => {
  return (
    <motion.div
      style={{
        y,
      }}
      className={className}
    >
      <h1 className="messageheaders-container-head playfair">{header}</h1>
      <p className="messageheaders-container-text">{text}</p>
    </motion.div>
  );
};

const MessageSection = ({ onLoad }) => {
  const messageSectionRef = useRef();

  const { scrollYProgress } = useScroll({
    target: messageSectionRef,
    offset: ["start end", "end center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yReal = useTransform(scrollYProgress, [0, 1], [-50, 30]);

  return (
    <div ref={messageSectionRef} className="messagesection-container">
      <MessageHeaders
        y={yReal}
        text={
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia ducimus dicta, ipsum corrupti aut illo!"
        }
        header={`The story behind the fabric.`}
        className={"messageheaders-container"}
      />

      <motion.div
        style={{ y }}
        className="messageheaders-container messageheaders-container-right"
      >
        <h1 className="messageheaders-container-right-head playfair">
          -Quality
        </h1>
        <h1 className="messageheaders-container-right-head playfair">
          -Resiliance
        </h1>
        <h1 className="messageheaders-container-right-head playfair">
          -Endurance
        </h1>
      </motion.div>

      <MessageContent scrollYProgress={scrollYProgress} />
    </div>
  );
};

export default MessageSection;
