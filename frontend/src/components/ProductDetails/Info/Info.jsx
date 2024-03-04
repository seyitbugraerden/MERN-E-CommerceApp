import { useParams } from "react-router-dom";
import "./Info.css";
import { useEffect, useState } from "react";
import {InputNumber} from "antd"

const Info = () => {
  const [productData, setProductData] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1)
  const params = useParams();
  const productId = params.id;

  console.log(productData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${productId}`
        );
        if (response.ok) {
          const data = await response.json();
          setProductData(data);
        } else {
          message.error("Failed to fetch product data");
        }
      } catch (error) {
        message.error("An error occurred while fetching product data");
      }
    };
    fetchData();
  }, [productId]);
  return (
    <div className="product-info">
      <h1 className="product-title">{productData.name}</h1>
      <div className="product-review">
        <ul className="product-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-half"></i>
          </li>
        </ul>
        <span>2 reviews</span>
      </div>
      <div className="product-price">
        <s className="old-price">{productData.price?.discount}%</s>
        <strong className="new-price">{productData.price?.current} TL</strong>
      </div>
      <p className="product-description">
        {productData.description}
      </p>
      <form className="variations-form">
        <div className="variations">
          <div className="colors">
            <div className="colors-label">
              <span>Color</span>
            </div>
            <div className="colors-wrapper">
              {productData.colors?.map((item, index) => {
                return (
                  <div
                    className={`color-wrapper ${
                      item === selectedColor ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => {
                      setSelectedColor(item);
                    }}
                  >
                    <label
                      className="blue-color"
                      style={{ backgroundColor: `${item}` }}
                    >
                      <input type="radio" name="product-color" />
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="values">
            <div className="values-label">
              <span>Size</span>
            </div>
            <div className="values-list">
              {productData.sizes?.map((item, index) => {
                return (
                  <span
                    key={index}
                    className={`${item === selectedSize ? "active" : ""}`}
                    onClick={()=>{setSelectedSize(item)}}
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="cart-button">
          <InputNumber min={1} max={1} value={quantity} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
            <button
              className="btn btn-lg btn-primary"
              id="add-to-cart"
              type="button"
            >
              Add to cart
            </button>
          </div>
          <div className="product-extra-buttons">
            <a href="#">
              <i className="bi bi-globe"></i>
              <span>Size Guide</span>
            </a>
            <a href="#">
              <i className="bi bi-heart"></i>
              <span>Add to Wislist</span>
            </a>
            <a href="#">
              <i className="bi bi-share"></i>
              <span>Share this Product</span>
            </a>
          </div>
        </div>
      </form>
      <div className="divider"></div>
      <div className="product-meta">
        <div className="product-sku">
          <span>SKU:</span>
          <strong>{productData._id}</strong>
        </div>
        <div className="product-categories">
          <span>Categories:</span>
          <strong>{productData.category}</strong>
        </div>
        <div className="product-tags">
          <span>Tags:</span>
          <a href="#">black</a>,<a href="#">white</a>
        </div>
      </div>
    </div>
  );
};

export default Info;
