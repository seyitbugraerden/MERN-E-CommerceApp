import { useParams } from "react-router-dom";
import Breadcrumb from "./Breadcrumb/breadcrumb";
import Gallery from "./Gallery/Gallery";
import Info from "./Info/Info";
import "./ProductDetails.css";
import Tabs from "./Tabs/Tabs";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const params = useParams();
  const productId = params.id;
  const [productData, setProductData] = useState([]);

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
  console.log(productData);

  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <Breadcrumb />
          <div className="single-content">
            <main className="site-main">
              <Gallery product={productData} />
              <Info />
            </main>
          </div>
          <Tabs />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
