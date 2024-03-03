import { message } from "antd";
import { createContext, useEffect } from "react";
import { useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (cartItem) => {
    setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
    message.success("Sepete Eklendi");
  };

  const removeFromCart = (itemId) => {
    const filteredCartItems = cartItems.filter((cartItem) => {
      return cartItem._id !== itemId;
    });
    setCartItems(filteredCartItems);
    message.error("Sepetten Kaldırıldı");
  };
  return (
    <CartContext.Provider value={{ addToCart, cartItems, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
