import { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider";
import { InputNumber } from "antd";
const CartItem = ({ cartItem }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <img src={cartItem.img[0]} alt="" />
        <i
          className="bi bi-x delete-cart"
          onClick={() => removeFromCart(cartItem._id)}
        ></i>
      </td>
      <td>{cartItem.name}</td>
      <td>${cartItem.price.current.toFixed(2)}</td>

      <td className="product-quantity">
        <InputNumber value={1} />
      </td>
      <td style={{ textAlign: "center" }}>
        ${(cartItem.price.current * 1).toFixed(2)}
      </td>
    </tr>
  );
};
export default CartItem;
