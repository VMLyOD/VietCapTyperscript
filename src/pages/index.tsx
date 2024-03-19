import React from "react";
import { HeaderMegaMenu } from "./components/header/header";
import SlideList from "./components/slideList/SlideList";
import Navsort from "./components/NavSort/Navsort";
import DropDown from "~/components/dropdown/dropdown";
import Footer from "./components/footers/Index";
import { Outlet } from "react-router-dom";
import DataTime from "~/components/dataTime/dataTimeReal";

const Home: React.FC = () => {
  return (
    <div className="box-index bg-black text-white">
      <HeaderMegaMenu />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
