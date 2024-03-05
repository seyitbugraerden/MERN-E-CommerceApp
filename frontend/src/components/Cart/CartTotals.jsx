import { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider";
import { message } from "antd";
import { loadStripe } from '@stripe/stripe-js'; // Import loadStripe

const CartTotals = ({ coupon }) => {
  const [fastCargoChecked, setFastCargoChecked] = useState(false);
  const { cartItems } = useContext(CartContext);

  const cartItemTotals = cartItems.map((item) => item.price.current);
  const subTotals = cartItemTotals.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  const cargoFee = 15;
  const cartTotals = fastCargoChecked ? (subTotals + cargoFee).toFixed(2) : subTotals.toFixed(2);

  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  const payTheCost = async () => {
    if (user) {
      const body = {
        product : cartItems,
        user : user,
        cargoFee : fastCargoChecked ? cargoFee : 0
      }
      try {
        const stripe = await loadStripe(import.meta.env.VITE_API_STRIPE_URL);
        const res = await fetch("http://localhost:3000/api/payment",{
          method : 'POST',
          headers: { // Fix typo here
            "Content-Type": "application/json" // Fix typo here
          },
          body : JSON.stringify(body)
        })
        if(!res.ok){
          return message.error("Ödeme İşlemi Başarısız")
        }
        
        const session = await res.json();
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        })
        if(result.error){
          throw new Error(result.error.message)
        }

      } catch (error) {
        console.error(error); // Log error
        message.error("Ödeme İşlemi Başarısız"); // Display user-friendly error message
      }
    } else {
      message.info("Giriş Yapmalısınız");
    }
  };

  return (
    <div className="cart-totals">
      <h2>Cart totals</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span id="subtotal">${subTotals.toFixed(2)}</span>
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
                      checked={fastCargoChecked}
                      onChange={() => setFastCargoChecked(!fastCargoChecked)}
                    />
                  </label>
                </li>
                <li>
                  <button type="button" aria-label="Change Address">Change Address</button> {/* Add aria-label */}
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              <strong id="cart-total">
                ${coupon ? `${(cartTotals - cartTotals * (coupon.discountPercent / 100)).toFixed(2)}` : `${cartTotals}`}
              </strong> 
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <button className="btn btn-lg" onClick={payTheCost}>Proceed to payment</button>
      </div>
    </div>
  );
};

export default CartTotals;
