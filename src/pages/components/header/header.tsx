import { Button, Grid, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import "./header.css";

import VietCapLogo from "~/components/icon/VietCapLogo";
import { useTranslation } from "react-i18next";
import FlagEN from "../../../assets/Images/flag-en-circle.svg";
import FlagVN from "../../../assets/Images/flag-vn-circle.svg";
import SlideListTrade from "../slideList/SlideListTrade";

import {
  IconShoppingCart,
  IconCaretDownFilled,
  IconLicense,
  IconMessage2,
  IconBellRinging,
  IconMessages,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconUsers,
  IconFileAnalytics,
  IconDatabaseImport,
  IconReceipt2,
  IconReceiptRefund,
} from "@tabler/icons-react";
import { SegmentedControl } from "@mantine/core";
import { Link } from "react-router-dom";
import ButtonDemo from "~/components/button/buttondemo";
import DataTime from "~/components/dataTime/dataTimeReal";
const tabs = {
  derivative: [
    { link: "/login", label: "PRICE BOARD", icon: IconBellRinging },
    { link: "", label: "ANALYSIS TOOLS", icon: IconCaretDownFilled },
    { link: "", label: "DERIVATIVE TRADING", icon: IconFingerprint },
    { link: "", label: "CASH TRANSACTION", icon: IconKey },
    { link: "", label: "ASSET INFORMATION", icon: IconDatabaseImport },
    { link: "", label: "PROMOTION", icon: Icon2fa },
    { link: "", label: "SUPPORT", icon: IconSettings },
  ],
  stock: [
    { link: "", label: "PRICE BOARD", icon: IconShoppingCart },
    { link: "/login", label: "ANALYSIS TOOLS", icon: IconLicense },
    { link: "", label: "STOCK TRADING", icon: IconMessage2 },
    { link: "", label: "CASH TRASACTION", icon: IconMessages },
    { link: "", label: "ASSET INFORMATION", icon: IconUsers },
    { link: "", label: "PROMOTION", icon: IconReceiptRefund },
    { link: "", label: "SUPPORT", icon: IconFileAnalytics },
  ],
};

export function HeaderMegaMenu() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { t } = useTranslation();

  const handleChangeLng = (): void => {
    const newLanguage = currentLanguage === "en" ? "vi" : "en";
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("lng", newLanguage);
  };

  const [section, setSection] = useState<"stock" | "derivative">("stock");
  const [active, setActive] = useState("Billing");

  const links = tabs[section].map((item) => (
    <a
      className="button-link-stock lg:text-white"
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <Button
        // h="28px"
        radius="0"
        color="gray-7"
        variant="subtle"
        className="header-bottom-button lg:text-white"
      >
        {item.label}
      </Button>
    </a>
  ));

  return (
    <div className="myheader-body bg-black lg:mt-1 lg:text-white ">
      <div className="myheader-container flex lg:justify-between items-center lg:text-white">
        <div className="myheader-left flex lg:items-center lg:text-white">
          <VietCapLogo />
          <div className="myheader-left-button lg:text-white m-1">
            <SegmentedControl
              radius="32px"
              variant="outline"
              className="button-stock lg:text-white button-stock bg-green-500"
              color="green"
              value={section}
              onChange={(value: any) => setSection(value)}
              transitionTimingFunction="ease"
              data={[
                { label: "Stock", value: "stock" },
                { label: "Derivative", value: "derivative" },
              ]}
            />
          </div>

          <span className="lg:text-white ml-2">
            <DataTime />
          </span>
        </div>
        <div className="myheader-right">
          <ButtonDemo color="red" size="medium">
            Sign In
          </ButtonDemo>
          <Link to="/login" className="Login-btn">
            <ButtonDemo color="green" size="medium">
              Login
            </ButtonDemo>
          </Link>
          <img
            src={currentLanguage === "en" ? FlagEN : FlagVN}
            alt="images language"
            className="h-[24px] w-[24px] mr-7 ml-6 cursor-pointer"
            onClick={() =>
              handleChangeLng(currentLanguage === "en" ? "vi" : "en")
            }
          />
        </div>
      </div>
      <Group className="group-mantine lg:text-white">
        <div className="button-link-stock color-custom w-[100%] lg:text-white">
          {links}
        </div>
      </Group>
      {/* <SlideListTrade /> */}
    </div>
  );
}
