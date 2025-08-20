import { Outlet, Route, Routes } from "react-router-dom";
import {
  Cart,
  Checkout,
  Home,
  Login,
  Profile,
  Register,
  Search,
  Shop,
  SingleProduct,
  Wishlist,
} from "./pages";
import { Footer, Header } from "./components";
import DashboardSidebar from "./components/DashboardSidebar";
import { Categories, Dashboard, Orders, Products, Users } from "./pages/Admin";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store/store";
import { fetchUser } from "./store/slices/authSlice";
import { useEffect } from "react";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import AdminRoutes from "./utils/AdminRoutes";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
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
        <Route path="shop/:productId" element={<SingleProduct />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="search" element={<Search />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="cart" element={<Cart />} />
        <Route path="cart/checkout" element={<Checkout />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <AdminRoutes>
                <DashboardSidebar>
                  <Outlet />
                </DashboardSidebar>
              </AdminRoutes>
            </ProtectedRoutes>
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
