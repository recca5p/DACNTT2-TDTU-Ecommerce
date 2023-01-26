import Header from "components/Header";
import Footer from "components/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import * as Actions from "actions";

const HomeLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.getAllCategories());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-230px)] pt-[32px] pb-[64px] px-[24px] 2xl:container 2xl:mx-auto 2xl:px-0">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default HomeLayout;
