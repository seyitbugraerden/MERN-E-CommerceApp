import { useEffect, useState } from "react";
import "./Search.css";
import { message } from "antd";
const Search = ({ isSearchShow, setIsSearchShow }) => {
  const [inputValue, setInputValue] = useState("Analogue");
  const [searchedValue, setSearchedValue] = useState([]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const fetchCategories = async () => {
    try {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/search/${inputValue}`
        );
        if (response.ok) {
          const data = await response.json();
          setSearchedValue(data);
        }
      } catch (error) {}
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [inputValue]);
  return (
    <div className={`modal-search ${isSearchShow ? "show" : ""} `}>
      <div className="modal-wrapper">
        <h3 className="modal-title">Search for products</h3>
        <p className="modal-text">
          Start typing to see products you are looking for.
        </p>
        <form className="search-form">
          <input
            type="text"
            placeholder="Search a product"
            onChange={handleChange}
            value={inputValue}
          />
          <button>
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>RESULTS FROM PRODUCT</h3>
          </div>
          <div className="results">
            {isSearchShow &&
              (searchedValue.length >= 1 ? (
                searchedValue.map((item) => (
                  <a href="#" className="result-item" key={item._id}>
                    <img src={item.img[0]} className="search-thumb" alt="" />
                    <div className="search-info">
                      <h4>{item.name}</h4>
                      <span className="search-sku">SKU: PD0016</span>
                      <span className="search-price">
                        ${item.price.current}
                      </span>
                    </div>
                  </a>
                ))
              ) : (
                <p style={{paddingLeft : '15px'}}>Ürün Bulunamadı</p>
              ))}
          </div>
        </div>
        <i
          className="bi bi-x-circle"
          id="close-search"
          onClick={() => {
            setIsSearchShow(false);
            setInputValue("");
          }}
          
        ></i>
      </div>
      <div
        className="modal-overlay"
        onClick={() => {setIsSearchShow(false); setInputValue("");} }
      ></div>
    </div>
  );
};
export default Search;
