import { useEffect, useState } from "react";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import "./Gallery.css";

const Gallery = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [indexValue, setIndexValue] = useState(0);
  const params = useParams();
  const productId = params.id;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${productId}`
        );
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]); // Include productId as a dependency

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };

  function PrevBtn({ onClick }) {
    return (
      <button
        className="glide__arrow glide__arrow--left"
        data-glide-dir="<"
        onClick={onClick}
        style={{
          zIndex: "2",
        }}
      >
        <i className="bi bi-chevron-left"></i>
      </button>
    );
  }

  function NextBtn({ onClick }) {
    return (
      <button
        className="glide__arrow glide__arrow--right"
        data-glide-dir=">"
        onClick={onClick}
        style={{
          zIndex: "2",
        }}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    );
  }
const productImg= product.img
  return (
    <>
      {product && product.img && product.img[indexValue] && (
        <img src={product.img[indexValue]} alt="" />
      )}
        

    </>
  );
};

export default Gallery;
