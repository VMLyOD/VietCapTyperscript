import React, { useState } from "react";
import "./Header.css";
import HeaderRight from "./HeaderRight/HeaderRight";
import Navigation from "./Navigation/Navigation";
import DataTime from "~/components/dataTime/dataTimeReal";
import { useTranslation } from "react-i18next";
import { useTheme } from "~/context/ThemeContext";
import VietCapLogoLight from "/assets/logo/logo-light.svg";
import VietCapLogoDark from "/assets/logo/logo-dark.svg";
import { useComputedColorScheme } from "@mantine/core";

const HeaderMegaMenu: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"stock" | "derivative">("stock");
  const { t } = useTranslation();

  const handleTabChange = (tab: "stock" | "derivative") => {
    setActiveTab(tab);
  };
  const computedColorScheme = useComputedColorScheme();

  return (
    <div className="myheader-body ">
      <div className="myheader-container justify-between flex items-center ">
        <div className="header-left flex items-center justify-center h-7">
          <div className="logo-header flex items-center justify-center h-7">
            <img
              className="h-[24px]"
              src={
                computedColorScheme === "light"
                  ? VietCapLogoLight
                  : VietCapLogoDark
              }
              alt="logo-bruh"
            />
          </div>
          <div className="nav-center flex justify-center items-center">
            <div className="tab-buttons flex rounded-[35px]">
              <div className="btn-left rounded-[35px]">
                <button
                  onClick={() => handleTabChange("stock")}
                  className={activeTab === "stock" ? "active stock" : "stock"}
                  style={{ width: "78px", borderRadius: "32px" }}
                >
                  {t("Stock")}
                </button>
              </div>
              <div className="btn-right rounded-[35px]">
                <button
                  onClick={() => handleTabChange("derivative")}
                  className={
                    activeTab === "derivative"
                      ? "active derivative"
                      : "derivative"
                  }
                  style={{ width: "78px", borderRadius: "32px" }}
                >
                  {t("Derivative")}
                </button>
              </div>
            </div>
            <span
              className="w-[150px] ml-2 items-center justify-center"
              // style={{
              //   background:
              //     theme === Theme.Light ? "var(--mantine-color-gray_0-filled)" : "var(--light)",
              //   color: theme === Theme.Light ? "var(--light)" : "var(--mantine-color-gray_0-filled)",
              // }}
            >
              <DataTime />
            </span>
          </div>
        </div>
        <div className="myheader-right">
          <HeaderRight />
        </div>
      </div>
      <div className="header-nav">
        <Navigation activeTab={activeTab} setActiveTab={handleTabChange} />
      </div>
    </div>
  );
};

export default HeaderMegaMenu;
