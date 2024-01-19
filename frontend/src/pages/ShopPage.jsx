import React from "react";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";
import Categories from "../components/Categories/Categories";
import Policy from "../components/Layouts/Policy";
import Products from "../components/Products/Products";

const ShopPage = () => {
  return (
    <>
      <Categories />
      <Products />
      <CampaignSingle />
      <Products />
      <Policy />
    </>
  );
};

export default ShopPage;
