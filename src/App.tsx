import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product" element={<SingleProduct />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<Search />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/cart/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
