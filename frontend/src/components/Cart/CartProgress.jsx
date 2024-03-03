import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import { Progress } from "antd";

const CartProgress = () => {
  const { cartItems } = useContext(CartContext);
  const freeShipping = 500;

  const total = cartItems.reduce((accumulator, item) => {
    return accumulator + item.price.current;
  }, 0);

  // Calculate remaining amount needed for free shipping
  const remainingForFreeShipping = freeShipping - total;
  if (remainingForFreeShipping < 0) {
    remainingForFreeShipping = 0;
  }
  return (
    <div className="free-progress-bar">
      <p className="progress-bar-title">
        {remainingForFreeShipping > 0
          ? `Add $${remainingForFreeShipping.toFixed(
              2
            )} to cart and get free shipping!`
          : "You qualify for free shipping!"}
      </p>
      <Progress
        percent={`${
          ((freeShipping - (freeShipping - total)) * 100) / freeShipping
        }`}
      />
    </div>
  );
};

export default CartProgress;
