import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import "./CartSidebar.scss";
import { useLenis } from "lenis/react";
import CartElement from "../CartElement/CartElement";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import ThirdMenuButton from "../ThirdMenuButton/ThirdMenuButton";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { colors } from "../utils/colors";
import useCart from "../utils/useCart";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api, version } from "../utils/api";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useToast } from "../utils/ToastContext";

const NotLoggedIn = () => {
  return (
    <div className="notloggedin-container">
      <h1 className="notloggedin-container-text">You're not logged in.</h1>
    </div>
  );
};

const CartBottom = ({ onCheckout, total, inline }) => {
  const { clearCart, orderId, setOrderId, clearCartLocal } = useCart();
  const { addToast } = useToast();
  const onClearHandler = () => {
    clearCart();
  };

  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const toCheckout = () => {
    onCheckout();

    navigate("/checkout");
  };

  const {
    mutate: startOrder,
    data,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${api}/v${version}/Order/start-create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to start order");
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log(data);
      clearCartLocal();
      setOrderId(data?.orderId);
      toCheckout();
    },
    onError: (error) => {
      console.error("Error getting addresses.:", error);
      addToast("Error starting order", "error");
    },
  });

  return (
    <div className="cartbottom-container">
      <hr className="cartcontents-container-divider" />
      <div className="cartbottom-container-total">
        <span className="cartbottom-container-total-text">Total:</span>
        <div className="cartbottom-container-total-text-wrapper">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={total}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              className="cartbottom-container-total-text"
            >
              {total}€
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <hr className="cartcontents-container-divider" />

      <ThirdMenuButton onClick={startOrder} text={"Checkout"} />
      <ThirdMenuButton onClick={onClearHandler} text={"Clear Cart"} />
    </div>
  );
};

export const CartContents = ({ onMenuClose }) => {
  const { cart, addToCart } = useCart();
  const cartMock = [
    {
      id: "936f2a75-a4c1-4329-9fe2-53e9f5111e79",
      shirtname: "Dreal Blueprint",
      img: "/cataloguepics/dreal/dreal-cappuchino.webp",
      color: colors[2],
      price: 44.99,
      quantity: 1,
      size: "S",
    },
    {
      id: "edf81216-44df-4e3f-8103-c14c31bca4f7",
      shirtname: "LifestyleClub",
      img: "/cataloguepics/lifestyle/lifestyle-white.webp",
      color: colors[1],
      price: 44.99,
      quantity: 2,
      size: "L",
    },
    {
      id: "f2b0a2ca-73b3-4acc-a53b-2d9b3f8f968c",
      shirtname: "Dreal Blueprint",
      img: "/cataloguepics/dreal/dreal-black.webp",
      color: colors[0],
      price: 44.99,
      quantity: 1,
      size: "M",
    },
  ];

  // const [cart, setCart] = useState(cartMock);

  const onChangeQuantity = (item, value) => {
    // if(value === 1) {
    //   addToCart(item)
    // } else {
    // }
  };

  const handleMenuClose = () => {
    if (typeof onMenuClose === "function") {
      onMenuClose();
    }
  };

  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {}, [cart]);

  return (
    <div className="cartcontents-container">
      <div className="cartcontents-container-header">
        <span className="cartcontents-container-header-text">Cart</span>
        <img
          className="cartcontents-container-header-close"
          src="/icons/e-remove_dark.svg"
          alt=""
          onClick={handleMenuClose}
        />
      </div>
      <hr className="cartcontents-container-divider" />

      {isAuthenticated ? (
        <>
          <div className="cartcontents-container-list">
            <div className="cartcontents-container-list-inner">
              <AnimatePresence>
                {cart.cartItems.map((element, i) => (
                  <CartElement
                    onQuantityChange={onChangeQuantity}
                    data={element}
                    key={i}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
          {cart?.cartItems.length > 0 && (
            <CartBottom
              onCheckout={onMenuClose}
              total={cart?.totalPrice?.toFixed(2)}
            />
          )}
        </>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

const CartSidebar = (props, ref) => {
  useImperativeHandle(
    ref,
    () => {
      return {
        openCart,
        closeCart,
      };
    },
    []
  );
  const [isOpen, setIsOpen] = useState(false);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const transitionOptions = {
    duration: 0.75,
    ease: easeInOut,
  };

  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="cartsidebar-container">
            <motion.div
              className="cartsidebar-container-background"
              onClick={closeCart}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={transitionOptions}
            ></motion.div>

            <motion.div
              initial={{
                x: "100%",
              }}
              animate={{
                x: "0%",
              }}
              exit={{
                x: "100%",
              }}
              className="cartsidebar-container-sidebar"
              transition={transitionOptions}
            >
              <div
                data-lenis-prevent
                className="cartsidebar-container-sidebar-inner"
              >
                <CartContents onMenuClose={closeCart} />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default forwardRef(CartSidebar);
