import { useNavigate } from "react-router-dom";
import "./CheckoutLoader.scss";
import { useEffect } from "react";

const CheckoutLoader = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    const timeout = setTimeout(() => {
      navigate("/");
      clearTimeout(timeout);
    }, 1000);
  };

  useEffect(() => {
    navigateToHome();
  }, []);
  return (
    <div className="checkoutloader-container">
      <h1 className="checkoutloader-container-text">Error creating order.</h1>
    </div>
  );
};

export default CheckoutLoader;
