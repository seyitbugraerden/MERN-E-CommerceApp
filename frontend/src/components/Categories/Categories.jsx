import CategoryItem from "./CategoryItem";
import "./Categories.css";
import { useCallback, useEffect, useState } from "react";

const Categories = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategoriesData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>All Categories</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <ul className="category-list">
          {categoriesData.map((item) => {
            return <CategoryItem item={item} key={item._id} />;
          })}
        </ul>
      </div>
    </section>
  );
};

export default Categories;
