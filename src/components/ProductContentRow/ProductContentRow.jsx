import { useEffect, useState } from "react";
import "./ProductContentRow.scss";

const RowElement = ({ img }) => {
  return (
    <div className="productcontentrow-container-img-container">
      <img
        src={img.src}
        alt=""
        className="productcontentrow-container-img-container-img"
      />
    </div>
  );
};

const ProductContentRow = ({ girdImgs }) => {
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
      className="productcontentrow-container"
      style={{
        rotate: `${angle}deg`,
      }}
    >
      {girdImgs.map((img, i) => (
        <RowElement img={img} key={i} />
      ))}
    </div>
  );
};

export default ProductContentRow;
