import { Link } from "react-router-dom";
import "./Footer.scss";
import FooterListElement from "./FooterListElement";

const FooterList = ({ header, list }) => {
  return (
    <>
      <div className="footerlist-container">
        <span className="footerlist-container-header">{header}</span>
        <hr className="footerlist-container-divider" />
        {list.map((element, index) => (
          <FooterListElement key={index} index={index} data={element} />
        ))}
      </div>
    </>
  );
};

export default FooterList;
