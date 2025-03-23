import { Link } from "react-router-dom";
import "./Navbar.scss";
import logo from "/logo.svg";
import { useEffect, useRef, useState } from "react";
import { useToast } from "../utils/ToastContext";
import { useModal } from "../utils/ModalProvider";

const MenuButton = ({ onLoad, onChange }) => {
  const divRef = useRef(null);
  const [centerPositon, setCenterPosition] = useState(0);

  useEffect(() => {
    const updateCenterPosition = () => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        setCenterPosition({ x: centerX, y: centerY });
      }
    };

    updateCenterPosition();

    window.addEventListener("resize", updateCenterPosition);

    return () => window.removeEventListener("resize", updateCenterPosition);
  }, []);

  useEffect(() => {
    onLoad(centerPositon);
  }, [centerPositon]);

  return (
    <div
      ref={divRef}
      className="navbar-container-inner-menu"
      onClick={() => onChange(true)}
    >
      <img
        className="navbar-container-inner-menu-img"
        src="/icons/menu.svg"
        alt=""
        draggable={false}
      />
    </div>
  );
};

const Navbar = ({ onLoad, onMenuToggle, onCartOpen }) => {
  const onChangeHandler = (value) => {
    onMenuToggle(value);
  };
  const { addToast } = useToast();
  const { openModal } = useModal();
  const messages = [
    ["Successfully signed in.", "success"],
    ["Added to cart.", "info"],
    ["An error has occured.", "error"],
    ["Not in stock.", "error"],
    ["Not logged in.", "error"],
    ["Cart emptied.", "info"],

    ["Successfully logged out.", "success"],
    ["Purchase successful.", "success"],
  ];

  const addToastHandler = () => {
    const index = Math.floor(Math.random() * messages.length);
    addToast(...messages[index]);
    // addToast("Successfully signed in.", "success");
  };

  const handleOpenModal = () => {
    openModal({ header: "Addresses", content: <span>CONTENT</span> });
  };
  return (
    <div className="navbar-container">
      <div className="navbar-container-inner">
        <Link to={"/"}>
          <img
            className="navbar-container-inner-logo"
            draggable={false}
            src={logo}
            alt=""
          />
        </Link>
        {/* <span onClick={addToastHandler}>Toasty</span>
        <span onClick={handleOpenModal}>Modal Test</span> */}
        {<div className="navbar-container-inner-right">
          
          <MenuButton onChange={onChangeHandler} onLoad={onLoad} />
        </div> }
      </div>
    </div>
  );
};

export default Navbar;
