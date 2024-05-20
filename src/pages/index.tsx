import React from "react";
import HeaderMegaMenu from "./header/Header";
import Footer from "./footers/Index";
import { Outlet } from "react-router-dom";
import { useTheme } from "~/context/ThemeContext";
import { Theme } from "~/context/ThemeContext/themes";

const Home: React.FC = () => {
  const { theme } = useTheme();

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    // <div className={theme === Theme.Light ? "LightMode" : "DarkMode"}>
    <>
      <HeaderMegaMenu />
      <Outlet />
      <Footer />
    </>
    // </div>
  );
};

export default Home;
