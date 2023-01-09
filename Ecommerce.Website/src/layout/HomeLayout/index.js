import Footer from "layout/components/Footer";
import Header from "layout/components/Header";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <div className="mt-[32px] mb-[64px] px-[24px] 2xl:container 2xl:mx-auto">
		<Outlet />
	  </div>
      <Footer />
    </>
  );
};

export default HomeLayout;