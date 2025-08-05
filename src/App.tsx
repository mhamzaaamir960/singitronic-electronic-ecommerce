import { Route, Routes } from "react-router-dom";
import { Home, Shop } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop/>} />
    </Routes>
  );
}

export default App;
