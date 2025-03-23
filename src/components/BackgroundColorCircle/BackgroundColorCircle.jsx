import { useEffect, useRef, useState } from "react";
import "./BackgroundColorCircle.scss";
import { animate, cubicBezier, useMotionValue, useSpring } from "framer-motion";
import { easeInOut } from "framer-motion/dom";

const BackgroundColorCircle = ({ data }) => {
  const [lastData, setLastData] = useState(null);
  const [isOnTop, setIsOnTop] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const maskRef = useRef(null);

  const cubicEase = cubicBezier(0.23, 0.08, 0.1, 0.99);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const circleWidth = useMotionValue(0);

  useEffect(() => {
    const updateMaskPosition = () => {
      maskRef.current.style.clipPath = `circle(${circleWidth.get()}% at ${x.get()}px ${y.get()}px)`;
    };

    const unsubyWidth = circleWidth.on("change", () => updateMaskPosition());

    return () => {
      unsubyWidth();
    };
  }, []);

  useEffect(() => {
    if (data) {
      setLastData(data);
      setIsOnTop(true);
      animate(circleWidth, 100, { duration: 1.5, ease: cubicEase });

      x.set(data.x);
      y.set(data.y);
    } else {
      animate(circleWidth, 0, {
        duration: 0.5,
        ease: cubicEase,
        onComplete: () => setIsOnTop(false),
      });
    }
  }, [data]);

  return (
    <div
      className={`backgroundcolorcircle-container`}
      ref={maskRef}
      style={{
        backgroundColor: lastData?.hex,
        zIndex: isOnTop ? 1 : 0,
        clipPath: "cirlce(10% at 10px 10px)",
      }}
    >
      {/* <span className="backgroundcolorcircle-container-text">
        {(lastData?.color + " ").repeat(100)}
      </span> */}
    </div>
  );
};

export default BackgroundColorCircle;
