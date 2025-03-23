import { AnimatePresence } from "framer-motion";
import useCart from "../utils/useCart";
import "./CheckoutCartContents.scss";
import CartElement from "../CartElement/CartElement";

const CheckoutCartContents = ({ overview = false }) => {
  const { cart, addToCart } = useCart();

  return (
    <div data-lenis-prevent className="checkoutcartcontents-container">
      <AnimatePresence>
        <div className="checkoutcartcontents-container-list">
          {cart.overviewCart.map((element, i) => (
            <CartElement
              // onQuantityChange={onChangeQuantity}
              data={element}
              key={i}
            />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default CheckoutCartContents;
