import SliderItem from "./SliderItem";
import "./Slider.css";
import { useState } from "react";

const Sliders = () => {
  const [currentSlide, setCurrentSlide] = useState(2);

  return (
    <section className="slider">
      <div className="slider-elements">
        {currentSlide === 0 && <SliderItem imgSrc="img/slider/slider1.jpg" />}
        {currentSlide === 1 && <SliderItem imgSrc="img/slider/slider2.jpg" />}
        {currentSlide === 2 && <SliderItem imgSrc="img/slider/slider3.jpg" />}

        <div className="slider-buttons">
          <button
            onClick={() => {
              if (currentSlide === 0) {
                setCurrentSlide(0);
              } else {
                setCurrentSlide(currentSlide - 1);
              }
            }}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            onClick={() => {
              if (currentSlide === 2) {
                setCurrentSlide(2);
              } else {
                setCurrentSlide(currentSlide + 1);
              }
            }}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
        <div className="slider-dots">
          <button
            className={`slider-dot ${currentSlide === 0 ? "active" : ""}`}
            onClick={() => {
              setCurrentSlide(0);
            }}
          >
            <span></span>
          </button>
          <button
            onClick={() => {
              setCurrentSlide(1);
            }}
            className={`slider-dot ${currentSlide === 1 ? "active" : ""}`}
          >
            <span></span>
          </button>
          <button
            onClick={() => {
              setCurrentSlide(2);
            }}
            className={`slider-dot ${currentSlide === 2 ? "active" : ""}`}
          >
            <span></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sliders;
