import { createContext } from "react";
import { useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  console.log(cartItems.length);

  const addToCart = (cartItem) => {
    setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
  };
  return (
    <CartContext.Provider value={{ addToCart, cartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
