import { Link, useNavigate } from "react-router-dom";
import "./NavbarMenu.scss";
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { motion, easeInOut, cubicBezier } from "framer-motion";
import { useToast } from "../utils/ToastContext";

const InvertedNavbar = ({ onClose }) => {
  return (
    <div className="invertednavbar-container">
      <div className="invertednavbar-container-inner">
        <Link to={"/"}>
          <img
            className="invertednavbar-container-inner-logo"
            src={"/logo.svg"}
            alt=""
          />
        </Link>
        <img
          src="/icons/e-remove.svg"
          className="invertednavbar-container-inner-close"
          alt=""
          onClick={onClose}
        />
      </div>
    </div>
  );
};

const NavbarMenuItem = ({ duration = 0.45, link }) => {
  const linkTo = link[1];
  const text = link[0];
  const letters = text.split("");

  const navigate = useNavigate();

  const cubicEase = cubicBezier(0.41, 0, 0.59, 1);

  const onClickHandler = () => {
    if (typeof link[1] === "function") {
      linkTo();
    } else if (linkTo.startsWith("http://") || linkTo.startsWith("https://")) {
      window.open(linkTo, "_blank", "noopener noreferrer");
    } else {
      navigate(linkTo);
    }
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="navbarmenuitem-container"
      onClick={onClickHandler}
    >
      {letters.map((letter, i) => (
        <motion.div
          key={i}
          variants={{
            initial: {
              y: "0%",
            },
            hovered: {
              y: "100%",
            },
          }}
          transition={{
            duration: duration,
            ease: cubicEase,
            delay: (i * duration) / (letters.length * 3),
          }}
          className="navbarmenuitem-container-letter"
        >
          <span className="navbarmenuitem-container-letter-text">{letter}</span>
          <motion.span
            variants={{
              initial: {
                scaleY: 0.1,
              },
              hovered: {
                scaleY: 1,
              },
            }}
            transition={{
              duration: duration,
              ease: cubicEase,

              delay: (i * duration) / (letters.length * 3),
            }}
            className="navbarmenuitem-container-letter-text navbarmenuitem-container-letter-text-apsolute"
          >
            {letter}
          </motion.span>
        </motion.div>
      ))}
    </motion.div>
  );
};

const NavbarMenu = (props, ref) => {
  useImperativeHandle(
    ref,
    () => {
      return {
        setMenuOrigin,
        toggleMenu,
      };
    },
    []
  );
  const [menuOrigin, setMenuOrigin] = useState({ x: "100%", y: "0%" });
  const [isOpen, setIsOpen] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const divRef = useRef();

  const toggleMenu = (value) => setIsOpen(value);

  const animationStates = {
    hidden: {
      clipPath: `circle(0% at ${menuOrigin.x}px ${menuOrigin.y}px)`,
    },
    visible: {
      opacity: 1,
      clipPath: `circle(155% at ${menuOrigin.x}px ${menuOrigin.y}px)`,
    },
  };

  const linksNoPayment = [
    ["Shop", "/catalogue"],
    ["DrealStudio", "https://www.dreal.studio/"],
  ];

  return (
    <>
      <motion.div
        className={`navbarmenu-container`}
        ref={divRef}
        initial={animationStates.hidden}
        animate={!isOpen ? animationStates.hidden : animationStates.visible}
        transition={{ duration: 1, ease: easeInOut }}
      >
        <div className="navbarmenu-container-inner">
          {linksNoPayment.map((link, i) => (
            <NavbarMenuItem key={i} link={link} />
          ))}
        </div>
        <InvertedNavbar onClose={() => toggleMenu(false)} />
      </motion.div>
    </>
  );
};

export default forwardRef(NavbarMenu);
