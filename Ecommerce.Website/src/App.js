import { BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Routes path="/" element={<Home />} />
        <Routes path="/product-detail/:id" element={<ProductDetail />}
        <Route path="*" element={<p>Path not resolved</p>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
