import { useEffect, useState } from "react";
import "./CartElement.scss";
import { motion } from "framer-motion";
import { colors } from "../utils/colors";
import { getImageFromProductInstanceId } from "../utils/misc";

const Quantity = ({ onQuantityChange, quantity }) => {
  return (
    <div className="quantity-container">
      <div
        onClick={() => onQuantityChange(-1)}
        className="quantity-container-button"
      >
        {"-"}
      </div>
      <span className="quantity-container-text">{quantity}</span>
      <div
        onClick={() => onQuantityChange(1)}
        className="quantity-container-button"
      >
        {"+"}
      </div>
    </div>
  );
};

const CartElement = ({ onQuantityChange, data }) => {
  const onQuantityChangeHandler = (value) => {
    const item = {
      productId: "34a0a423-05e7-4a6b-9c85-e4785c9fcc3d",
      productInstanceId: "1aad9a3d-87c5-4487-8866-2e671c75c308",
      quantity: 1,
    };
    onQuantityChange(item, value);
  };

  const image = getImageFromProductInstanceId(data.productInstanceId);

  return (
    <motion.div exit={{ opacity: 0 }} className="cartelement-container">
      <img
        src={image}
        className="cartelement-container-image"
        alt="ProductImage"
      />
      <div className="cartelement-container-gradient"></div>
      <div className="cartelement-container-right">
        <span className="cartelement-container-right-text cartelement-container-right-text-shirtname playfair">
          {data.productName}
        </span>
        <span className="cartelement-container-right-text cartelement-container-right-text-color">
          color:{" "}
          <span className="cartelement-container-right-text-bolded">
            {colors[data.color]}
          </span>
        </span>
        <span className="cartelement-container-right-text cartelement-container-right-text-color">
          size:{" "}
          <span className="cartelement-container-right-text-bolded">
            {data.fit}
          </span>
        </span>
        <span className="cartelement-container-right-text cartelement-container-right-text-price">
          price:{" "}
          <span className="cartelement-container-right-text-bolded">
            {data.price}€
          </span>
        </span>
        <Quantity
          onQuantityChange={onQuantityChangeHandler}
          quantity={data.quantity}
        />
      </div>
    </motion.div>
  );
};

export default CartElement;
