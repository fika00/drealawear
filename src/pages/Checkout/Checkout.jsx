import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { CartContents } from "../../components/CartSidebar/CartSidebar";
import CheckoutCartContents from "../../components/CheckoutCartContents/CheckoutCartContents";
import "./Checkout.scss";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { api, version } from "../../components/utils/api";
import { useEffect, useState } from "react";
import useCart from "../../components/utils/useCart";
import CheckoutLoader from "./CheckoutLoader/CheckoutLoader";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import ShippingForm from "./ShippingForm/ShippingForm";

const StageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 10,
      }}
      exit={{
        opacity: 0,
        x: -10,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
};

const Checkout = () => {
  const { orderId } = useCart();

  const [stage, setStage] = useState(0);

  const stageHandler = () => {
    setStage((prev) => {
      if (prev == stages.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  const stages = [<CheckoutForm onSuccess={stageHandler} />, <ShippingForm />];

  return (
    <div className="checkout-container">
      <div
        className="stagewrapper-container"
        style={{
          gridColumn: "span 3",
          height: "100vh",
        }}
      >
        <AnimatePresence mode="wait">
          <StageWrapper key={stage}>{stages[stage]}</StageWrapper>
        </AnimatePresence>
      </div>
      <CheckoutCartContents />
      {!orderId && <CheckoutLoader />}
    </div>
  );
};

export default Checkout;
