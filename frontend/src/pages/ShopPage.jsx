import React from 'react';
import CampaignSingle from '../components/CampaignSingle/CampaignSingle'
import Categories from '../components/Categories/Categories'
import Footer from '../components/Layouts/Footer'
import Header from '../components/Layouts/Header'
import Policy from '../components/Layouts/Policy'
import Products from '../components/Products/Products'

const ShopPage = () => {
  return (
    <>
        <Header />
        <Categories />
        <Products />
        <CampaignSingle />
        <Products />
        <Policy />
        <Footer />
    </>
  )
}

export default ShopPage
