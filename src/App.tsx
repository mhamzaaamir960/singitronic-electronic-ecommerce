import { Outlet, Route, Routes } from "react-router-dom";
import {
  Cart,
  Checkout,
  Home,
  Login,
  Register,
  Search,
  Shop,
  SingleProduct,
  Wishlist,
} from "./pages";
import { Footer, Header } from "./components";
import DashboardSidebar from "./components/DashboardSidebar";
import { Categories, Dashboard, Orders, Products, Users } from "./pages/Admin";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Outlet />
            <Footer />
          </>
        }
      >
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product" element={<SingleProduct />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="search" element={<Search />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="cart" element={<Cart />} />
        <Route path="cart/checkout" element={<Checkout />} />
        <Route
          path="/admin"
          element={
            <>
              <DashboardSidebar>
                <Outlet />
              </DashboardSidebar>
            </>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
