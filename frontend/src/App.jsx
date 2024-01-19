import "./App.css";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import BlogPage from "./pages/BlogPage";
import BlogDetails from "./components/Blogs/BlogDetails";

function App() {
  return (
    <>
      <HomePage />
      <ShopPage />
      <ContactPage />
      <AuthPage />
      <CartPage />
      <BlogPage />
      <BlogDetails />
    </>
  );
}

export default App;
