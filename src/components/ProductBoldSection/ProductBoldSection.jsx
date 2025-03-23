import { useScroll } from "framer-motion";
import ProductBold from "../ProductBold/ProductBold";
import "./ProductBoldSection.scss";
import { useRef } from "react";

const ProductBoldSection = ({ shirt, bgColor }) => {
  const divRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ["start end", "end start"],
  });

  return (
    <div className="productboldsection-container">
      <div
        ref={divRef}
        className="productboldsection-container-inner"
        style={{
          position: "relative",
          backgroundColor: bgColor,
        }}
      >
        <ProductBold shirt={shirt} parentScroll={scrollYProgress} />
      </div>
    </div>
  );
};

export default ProductBoldSection;
