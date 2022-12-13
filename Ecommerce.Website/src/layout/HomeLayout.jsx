import Footer from "pages/footer/Footer";
import Header from "pages/header/Header";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <div className="">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
};

export default HomeLayout;
