import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import { useState } from "react";

const CartTotals = () => {
  const [fast, setFast] = useState(false);
  const { cartItems } = useContext(CartContext);
  const totalNewPrice = cartItems
    .map((priceCart) => priceCart.price.newPrice)
    .reduce((total, price) => total + price, 0);
  console.log(totalNewPrice);
  return (
    <div className="cart-totals">
      <h2>Cart totals</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span id="subtotal">${totalNewPrice}</span>
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              <ul>
                <li>
                  <label>
                    Fast Cargo: $15.00
                    <input
                      type="checkbox"
                      id="fast-cargo"
                      onChange={() => {
                        setFast(!fast);
                      }}
                    />
                  </label>
                </li>
                <li>
                  <a href="#">Change Address</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              <strong id="cart-total">
                ${fast ? totalNewPrice + 15 : totalNewPrice}
              </strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <button className="btn btn-lg">Proceed to checkout</button>
      </div>
    </div>
  );
};

export default CartTotals;
