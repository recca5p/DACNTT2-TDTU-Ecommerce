import Header from "components/Header";
import Footer from "components/Footer";
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