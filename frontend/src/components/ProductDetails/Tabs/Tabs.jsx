import Reviews from "../../Reviews/Reviews";
import { useState } from "react";
import "./Tabs.css";

const Tabs = ({productData}) => {
  const [activeTab, setActiveTab] = useState("desc");

  return (
    <div className="single-tabs">
      <ul className="tab-list">
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "desc" ? "active" : ""}`}
            data-id="desc"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("desc");
            }}
          >
            Description
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "info" ? "active" : ""}`}
            data-id="info"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("info");
            }}
          >
            Additional information
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
            data-id="reviews"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("reviews");
            }}
          >
            Reviews
          </a>
        </li>
      </ul>
      <div className="tab-panel">
        <div
          className={`tab-panel-descriptions content ${
            activeTab === "desc" ? "active" : ""
          }`}
          id="desc"
        >
          {productData.description}
        </div>
        <div
          className={`tab-panel-descriptions content ${
            activeTab === "info" ? "active" : ""
          }`}
          id="info"
        >
          <h3>Additional information</h3>
          <table>
            <tbody>
              <tr>
                <th>Color</th>
                <td>
                  <p>
                    {productData.colors?.map((item,index)=>{
                      return <span key={index}> {item.toUpperCase()} </span>
                    })}
                  </p>
                </td>
              </tr>
              <tr>
                <th>Size</th>
                <td>
                  <p>{productData.sizes?.map((item,index)=>{
                    return <span key={index}> {item.toUpperCase()} </span>
                  })}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Reviews activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Tabs;
