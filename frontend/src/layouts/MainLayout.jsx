import React from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Search from "../components/Modals/Search/Search";
import Dialog from "../components/Modals/Dialog/Dialog";

function MainLayout({ children }) {
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [isDialogShow, setIsDialogShow] = useState(false);

  useEffect(() => {
    const dialogStatus = localStorage.getItem("dialog")
      ? JSON.parse(localStorage.getItem("dialog"))
      : localStorage.setItem("dialog", JSON.stringify(true));

    setTimeout(() => {
      setIsDialogShow(dialogStatus);
    }, 2000);
  }, []);

  return (
    <div className="main-layout">
      <Header setIsSearchShow={setIsSearchShow} />
      <Dialog isDialogShow={isDialogShow} setIsDialogShow={setIsDialogShow} />
      <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow} />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node,
};
