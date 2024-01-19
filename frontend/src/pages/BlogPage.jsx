import React from "react";
import Header from "../components/Layouts/Header";
import Blogs from "../components/Blogs/Blogs";
import Footer from "../components/Layouts/Footer";

const BlogPage = () => {
  return (
    <>
      <Header />
      <div className="blog-page">
        <Blogs />
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
