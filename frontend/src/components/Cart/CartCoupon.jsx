import { Button, Input, message } from "antd";
import { useCallback, useEffect, useState } from "react";

const CartCoupon = ({ onCouponSubmit }) => {
  const [value, setValue] = useState("");
  const [coupons, setCoupons] = useState([]);

  const fetchCoupons = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/coupons`);
      if (response.ok) {
        const data = await response.json();
        setCoupons(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    const foundCoupon = coupons.find((coupon) => coupon.code === value);
    if (foundCoupon) {
      message.success(`Kupon Başarılı %${foundCoupon.discountPercent} İndirim`);
      // foundCoupon değerini dışarıya gönder
      onCouponSubmit(foundCoupon);
    } else {
      message.error("Kupon Geçersiz");
    }
  };

  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <Input placeholder="Kupon Kodu" onChange={handleChange} />
        <Button onClick={handleSubmit}>Kodu Kullan</Button>
      </div>
      <div className="update-cart">
        <button className="btn">Update Cart</button>
      </div>
    </div>
  );
};

export default CartCoupon;
