import { useMutation } from "@tanstack/react-query";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { api, version } from "./api";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useToast } from "./ToastContext";

// Define action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";
const SET_CART = "SET_CART";

// Create the initial state
const initialState = {
  cartId: null,
  cartItems: [],
  totalPrice: 0,
  overviewCart: null, // Add this line
};

// Helper function to calculate the total price
const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

// Define the reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.cartItems.find(
        (item) => item.productInstanceId === action.payload.productInstanceId
      );
      let updatedCartItems;

      if (existingItem) {
        updatedCartItems = state.cartItems.map((item) =>
          item.productInstanceId === action.payload.productInstanceId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCartItems = [
          ...state.cartItems,
          { ...action.payload, quantity: 1 },
        ];
      }

      return {
        ...state,
        cartItems: updatedCartItems,
        totalPrice: calculateTotalPrice(updatedCartItems),
        overviewCart: null, // Clear overview cart when adding items
      };
    }

    case SET_CART:
      return {
        cartId: action.payload.cartId,
        cartItems: action.payload.cartItems || [],
        totalPrice: calculateTotalPrice(action.payload.cartItems || []),
      };

    case REMOVE_FROM_CART: {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.productInstanceId !== action.payload.productInstanceId
      );
      return {
        ...state,
        cartItems: updatedCartItems,
        totalPrice: calculateTotalPrice(updatedCartItems),
      };
    }

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        totalPrice: 0,
        overviewCart: state.cartItems,
      };

    default:
      return state;
  }
}

// Create the CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const [cartCoords, setCartCoords] = useState({ x: 0, y: 0 });

  const [orderId, setOrderId] = useState();

  const { addToast } = useToast();

  const removeFromCart = (id) =>
    dispatch({ type: REMOVE_FROM_CART, payload: id });

  const setCart = (cartData) => dispatch({ type: SET_CART, payload: cartData });

  // GET CART FUNCTION
  const authHeader = useAuthHeader();

  const {
    mutate: getUserCart,
    data: cartData,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${api}/v${version}/Cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });

      if (!response.ok) {
        throw new Error("Fetching cart failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setCart(data);
    },
    onError: (error) => {
      console.error("Fetching cart failed:", error);
    },
  });

  // ADD TO CART MUTATION

  const addToCart = (item) => {
    addToCartMutation(item); // Trigger server-side add mutation
  };

  const { mutate: addToCartMutation } = useMutation({
    mutationFn: async (item) => {
      const response = await fetch(`${api}/v${version}/Cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error("Failed adding to cart");
      }

      // return response.json();
      return;
    },
    onSuccess: (data, item) => {
      dispatch({ type: ADD_TO_CART, payload: item });
      addToast("Added to cart!", "success");
    },
    onError: (error) => {
      addToast(`Failed adding ${error}`, "error");

      console.error("Adding to cart failed:", error);
    },
  });

  const clearCart = () => clearCartMutation();

  const clearCartLocal = () => dispatch({ type: CLEAR_CART });

  const { mutate: clearCartMutation } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${api}/v${version}/Cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });

      if (!response.ok) {
        throw new Error("Failed adding to cart");
      }

      // return response.json();
      return;
    },
    onSuccess: (data, item) => {
      dispatch({ type: CLEAR_CART });
      addToast("Cart Cleared!", "success");
    },
    onError: (error) => {
      addToast(`Failed clearing cart ${error}`, "error");
    },
  });

  useEffect(() => {}, [state]);

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        clearCart,
        clearCartLocal,
        setCart,
        setCartCoords,
        getUserCart,
        setOrderId,
        orderId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
