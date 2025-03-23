import BuyMethod from "./BuyMethod/BuyMethod";
import "./BuyMethods.scss";

const BuyMethods = () => {
  return (
    <div className="buymethods-container">
      <div className="buymethods-container-left">
        <h1 className="buymethods-container-left-header">Dear customer,</h1>
        <p className="buymethods-container-left-text">
          We are currently working on implementing an online payment system. For
          the time being you can order by sending us a message on our Instagram
          profile or by email.
        </p>
        <p className="buymethods-container-left-text">
          Thank you for chosing{" "}
          <span className="buymethods-container-left-text-dreal">Dreal</span>.
        </p>
      </div>
      <div className="buymethods-container-right">
        <BuyMethod
          link={"https://www.instagram.com/drealwear/"}
          text={"Instagram"}
          imgSrc={"/icons/socials/ig.svg"}
        />
        <BuyMethod
          link={"mailto:info@drealwear.com?subject=Product%20request"}
          text={"Email"}
          imgSrc={"/icons/socials/mail.svg"}
        />
      </div>
    </div>
  );
};

export default BuyMethods;
