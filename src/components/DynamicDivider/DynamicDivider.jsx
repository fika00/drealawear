import { useEffect, useState } from "react";
import "./DynamicDivider.scss";

const DynamicDivider = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight / 2;
      let thetaRadians = Math.atan(height / width);
      let thetaDegrees = thetaRadians * (180 / Math.PI);
      setAngle(thetaDegrees);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      style={{
        rotate: `${angle}deg`,
      }}
      className="dynamicdivider-container"
    />
  );
};

export default DynamicDivider;
