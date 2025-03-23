import { useEffect, useState } from "react";
import "./SheetTop.scss";

const SheetTop = ({ bgColor }) => {
  const [didScroll, setDidScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setDidScroll(true);
      window.removeEventListener("scroll", handleScroll);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`sheettop-container ${
        !didScroll ? "sheettop-container-animate" : ""
      }`}
      style={{ backgroundColor: bgColor }}
    ></div>
  );
};

export default SheetTop;
