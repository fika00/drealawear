import { useEffect, useState } from "react";
import "./CheckoutConfirmation.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useToast } from "../../../components/utils/ToastContext";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../components/utils/api";
import { AnimatePresence, motion } from "framer-motion";
import ThirdMenuButton from "../../../components/ThirdMenuButton/ThirdMenuButton";

const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="checkout-confirmation-success">
      <div className="checkout-confirmation-success-inner">
        <div className="checkout-confirmation-success-inner-header">
          <img src="icons/c-check.svg" alt="Success" />

          <h1 className="checkout-confirmation-success-inner-header-title">
            Thank you for your order!
          </h1>
          <p className="checkout-confirmation-success-inner-header-description">
            Your order has been placed and is being processed. You will receive
            an email with your order details.
          </p>
          <ThirdMenuButton
            onClick={() => {
              navigate("/");
            }}
            text={"Continue Shopping"}
          />
        </div>
      </div>
    </div>
  );
};

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="checkout-confirmation-success">
      <div className="checkout-confirmation-success-inner">
        <div className="checkout-confirmation-success-inner-header">
          <img src="icons/c-remove.svg" alt="Success" />

          <h1 className="checkout-confirmation-success-inner-header-title">
            Something went wrong.
          </h1>
          <p className="checkout-confirmation-success-inner-header-description">
            Please try again and contact support if the problem persists.
          </p>
          <ThirdMenuButton
            onClick={() => {
              navigate("/catalogue");
            }}
            text={"Back to shop"}
          />
        </div>
      </div>
    </div>
  );
};

const CheckoutConfirmation = () => {
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState(-1);

  // Extract parameters
  const shoppingCartID = searchParams.get("ShoppingCartID");
  const wsPayOrderId = searchParams.get("WsPayOrderId");
  const success = searchParams.get("Success");
  const approvalCode = searchParams.get("ApprovalCode");
  const signature = searchParams.get("Signature");
  const shopID = searchParams.get("ShopID");
  const amount = searchParams.get("Amount");
  useEffect(() => {
    console.log("CHECKOUT CONFIRMATION", {
      shoppingCartID,
      wsPayOrderId,
      success,
      approvalCode,
      signature,
      shopID,
      amount,
    });

    // if (success === "1") {
    //   setStatus(0);
    // } else {
    //   setStatus(1);
    // }

    // const timeout = setTimeout(() => {
    //   setStatus(0);
    //   clearTimeout(timeout);
    // }, 1500);
    postCheckoutStatus();
  }, [
    shoppingCartID,
    wsPayOrderId,
    success,
    approvalCode,
    signature,
    shopID,
    amount,
  ]);

  const { authHeader } = useAuthHeader();

  const navigate = useNavigate();

  const { addToast } = useToast();

  const {
    mutate: postCheckoutStatus,
    data,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      const confirmationData = {
        shoppingCartID,
        wsPayOrderId,
        success,
        approvalCode,
        signature,
        shopID,
        amount,
      };

      console.log("STATUS", success);

      const response = await fetch(`${api}/callback/success`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(confirmationData),
      });

      if (!response.ok) {
        throw new Error("Failed to add address");
      }
      return await response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setStatus(0);
        addToast("Success.", "success");
      } else {
        setStatus(1);
        addToast("Failed.", "error");
      }
    },
    onError: (error) => {
      setStatus(1);
      addToast("Failed.", "error");
    },
  });

  return (
    <div className="checkout-confirmation-container">
      <div className="checkout-confirmation-container-inner">
        <AnimatePresence mode="popLayout">
          {status === -1 ? (
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              src="/logo_black.svg"
              className="checkout-confirmation-container-inner-loader"
              alt="loader"
            />
          ) : status === 0 ? (
            <motion.div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "-50% -50%",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Success />
            </motion.div>
          ) : (
            <motion.div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "-50% -50%",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Error />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CheckoutConfirmation;
