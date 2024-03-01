import "./App.css";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./components/Blogs/BlogDetails";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/blog/:id" element={<BlogDetailsPage />} />
      <Route path="/admin/*">
        <Route path="users" element={<AdminUserPage />} />
      </Route>
    </Routes>
  );
}

export default App;
