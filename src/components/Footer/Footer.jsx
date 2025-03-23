import { motion, useScroll, useTransform } from "framer-motion";
import "./Footer.scss";
import FooterList from "./FooterList";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useFader } from "../utils/context";


const Footer = () => {
  const navLinks = [
    ["/", "Home"],
    ["/about", "About"],
    ["/catalogue", "Shop"],
    ["/catalogue/dreal", "Dreal"],
    ["/catalogue/lifestyle", "Dreal LifeStyle"],
  ];
  const socialLinks = [
    ["https://www.instagram.com/drealwear/", "DrealWear - IG"],
    ["https://www.tiktok.com/@drealwear", "DrealWear - TT"],
  ];
  const contact = [["", "drealwear@gmail.com"]];

  const { development, setProduction } = useFader();


  return (
    <div className="footer-container">
      <div className="footer-container-inner">
        <div className="footer-container-inner-links">
          <div className="footer-container-inner-links-imgcont">
            <Link to={"/"}>
              <img
                src="/logo_black.svg"
                className="footer-container-inner-links-imgcont-img"
                alt=""
              />
            </Link>
          </div>

          {!development && <FooterList header={"Navigation"} list={navLinks} />}
          <FooterList header={"Socials"} list={socialLinks} />
          <FooterList header={"Contact"} list={contact} />
        </div>
        <div className="footer-container-inner-bottom">
          <span className="footer-container-inner-bottom-text">
            DrealWear <span onClick={setProduction}>•</span> 2024
          </span>
          <span className="footer-container-inner-bottom-text">
            Join the club !
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
