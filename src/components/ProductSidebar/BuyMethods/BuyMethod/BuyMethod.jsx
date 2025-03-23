import { Link } from "react-router-dom";
import "./BuyMethod.scss";

const BuyMethod = ({ link, imgSrc, text }) => {
  return (
    <Link to={link} target="_blank" className="buymethod-container">
      <img src={imgSrc} className="buymethod-container-img" alt="" />
      <span className="buymethod-container-text">{text}</span>
    </Link>
  );
};

export default BuyMethod;
