import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";

const CartItem = ({ items }) => {
  const { removeFromCart } = useContext(CartContext);
  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <img src={items.img.singleImage} alt="" />
        <i
          className="bi bi-x delete-cart"
          data-id={items.id}
          onClick={() => {
            removeFromCart(items.id);
          }}
        ></i>
      </td>
      <td>{items.name}</td>
      <td>${items.price.newPrice}</td>
      <td className="product-quantity">1</td>
      <td className="product-subtotal">${items.price.newPrice}</td>
    </tr>
  );
};

export default CartItem;
