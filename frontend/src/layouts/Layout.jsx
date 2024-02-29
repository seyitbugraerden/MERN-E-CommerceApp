import MainLayout from "./MainLayout";
import AdminLayout from "./AdminLayout";

const isAdmin = window.location.pathname.startsWith("/admin"); // Sayfanın anlık bilgilerini alabilmemizi sağlayan kod
export const Layout = isAdmin ? AdminLayout : MainLayout;
