import React from "react";
import Blogs from "../components/Blogs/Blogs";
import Brands from "../components/Brands/Brands";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";
import Campaigns from "../components/Campaigns/Campaigns";
import Categories from "../components/Categories/Categories";
import Policy from "../components/Layouts/Policy";
import Products from "../components/Products/Products";
import Slider from "../components/Slider/Slider";

const HomePage = () => {
  return (
    <>
      <Slider />
      <Categories />
      <Products />
      <Campaigns />
      <Blogs />
      <Brands />
      <CampaignSingle />
      <Policy />
    </>
  );
};

export default HomePage;
