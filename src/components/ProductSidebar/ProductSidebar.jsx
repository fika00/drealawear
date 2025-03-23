import { useEffect, useState } from "react";
import ColorSelector from "../ColorSelector/ColorSelector";
import SizeSelector from "../SizeSelector/SizeSelector";
import "./ProductSidebar.scss";
import SideBarToggle from "./SideBarToggle/SideBarToggle";
import isMobile from "../utils/isMobile";
import ThirdMenuButton from "../ThirdMenuButton/ThirdMenuButton";
import { useModal } from "../utils/ModalProvider";
import BuyMethods from "./BuyMethods/BuyMethods";

const ProductSidebar = ({
  data,
  onColorChange,
 
  onSizeChange,
  currentInstances,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const { openModal } = useModal();

  const onToggleHandle = () => {
    setIsHidden((prev) => !prev);
  };

  const handlePopUp = () => {
    openModal({ header: "Buy", content: <BuyMethods /> });
  };

  return (
    <div
      className={`productsidebar-container ${
        isHidden ? "productsidebar-container-hidden" : ""
      }`}
    >
      <div className="productsidebar-container-gradient"></div>
      <div className="productsidebar-container-inner">
        <span className="productsidebar-container-inner-droptext">
          --drop 01
        </span>
        <span className="productsidebar-container-inner-shirtname playfair">
          {data.name}
        </span>
        <div className="productsidebar-container-inner-undername">
          <div className="productsidebar-container-inner-undername-left">
            <span className="productsidebar-container-inner-undername-left-text">
              19.0985n, 72.8777n
            </span>
            <span className="productsidebar-container-inner-undername-left-text">
              {data.slogan}
            </span>
          </div>
          <span className="productsidebar-container-inner-undername-right">
            48.00€
          </span>
        </div>
        <hr className="productsidebar-container-inner-divider" />
        <p className="productsidebar-container-inner-description">
          {data.text}
        </p>
        <hr className="productsidebar-container-inner-divider" />
{/* 
        <SizeSelector
          onChange={onSizeChange}
          currentInstances={currentInstances}
        /> */}
        <ColorSelector
          // availability={availability}

          onChange={onColorChange}
        />

    
      </div>

    </div>
  );
};

export default ProductSidebar;
