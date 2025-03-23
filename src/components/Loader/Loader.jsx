import "./Loader.scss";

import { motion } from "framer-motion";

const Loader = ({ height }) => {
  return (
    <div
      style={{
        height: `${height}svh`,
      }}
      className="loader-container"
    >
      <div className="loader-container-inner">
        <h1 className="loader-container-inner-text">...</h1>
      </div>
    </div>
  );
};

export default Loader;
