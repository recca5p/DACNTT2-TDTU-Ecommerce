import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product-detail/:id" element={<ProductDetail />} />
      <Route path="*" element={<p>Path not resolved</p>} />
    </Routes>
  );
}
export default App;
