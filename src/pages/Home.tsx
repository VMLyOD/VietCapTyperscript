import React from "react";
import SlideList from "~/pages/components/slideList/SlideListTrade";
import Navsort from "./components/NavSort/Navsort";

const Home: React.FC = () => {
  return (
    <div>
      <SlideList />
      <Navsort />
      <div className="bg-green-500 h-[2px]"></div>
    </div>
  );
};

export default Home;
