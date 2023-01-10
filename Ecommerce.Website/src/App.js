import AuthLayout from "layout/AuthLayout";
import HomeLayout from "layout/HomeLayout";
import CartPage from "pages/Cart Page/CartPage";
import Home from "pages/home/Home";
import ProductDetail from "pages/ProductDetail";
import SignIn from "pages/Sign In";
import SignUp from "pages/SignUp";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
		  <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<p>Path not resolved</p>} />
        </Route>
		<Route element={<AuthLayout />}>
		  <Route path="/auth" element={<Navigate to="/auth/signin"/>} />
		  <Route path="/auth/sign-in" element={<SignIn />}/>
		  <Route path="/auth/sign-up" element={<SignUp />} />
		</Route>
      </Routes>
  );
}
export default App;
