import React, { useState } from "react";
import "./Cart.css";
import CartCoupon from "./CartCoupon";
import CartProgress from "./CartProgress";
import CartTable from "./CartTable";
import CartTotals from "./CartTotals";

const Cart = () => {
  // State to hold coupon data
  const [coupon, setCoupon] = useState(null);

  // Define handleCouponSubmit function
  const handleCouponSubmit = (coupon) => {
    // Handle coupon submission logic here
    console.log("Coupon submitted:", coupon);
    // Set the coupon state
    setCoupon(coupon);
  };

  return (
    <section className="cart-page">
      <div className="container">
        <div className="cart-page-wrapper">
          <form className="cart-form">
            <CartProgress />
            <div className="shop-table-wrapper">
              <CartTable />
              <CartCoupon onCouponSubmit={handleCouponSubmit} />
            </div>
          </form>
          <div className="cart-collaterals">
            <CartTotals coupon={coupon} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
