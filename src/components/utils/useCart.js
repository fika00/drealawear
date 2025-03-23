import { useContext } from "react";
import { CartContext } from "./CartContext";

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    setCart,
    getUserCart,
    setOrderId,
    orderId,
    clearCartLocal,
  } = context;

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    setCart,
    getUserCart,
    setOrderId,
    orderId,
    clearCartLocal,
  };
};

export default useCart;
