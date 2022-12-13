import HomeLayout from "layout/HomeLayout";
import Home from "pages/home/Home";
import ProductDetail from "pages/product/ProductDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<p>Path not resolved</p>} />
      </Route>
    </Routes>
  );
}
export default App;
