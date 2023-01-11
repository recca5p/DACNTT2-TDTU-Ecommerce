import AuthLayout from "layout/Auth Layout";
import HomeLayout from "layout/Home Layout";
import CartPage from "pages/Cart Page";
import HomePage from "pages/Home Page";
import ProductDetail from "pages/Product Detail Page";
import SignIn from "pages/Sign In Page";
import SignUp from "pages/Sign Up Page";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
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
