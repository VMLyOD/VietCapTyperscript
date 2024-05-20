import React from "react";
import ButtonDemo from "~/components/button/buttondemo";
import DropDown from "~/components/dropdown/dropdown";
import "./Style.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Asset1,
  StockItem1,
  STOCK2,
  Tool,
  StockItem2,
  Cash2,
  Asset2,
  Support,
  Tool2,
} from "~/shares/utils/Array";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { rem } from "@mantine/core";

export interface ToolItem {
  value: string;
  label: string;
  link: string;
  icon?: string;
}

const Navigation: React.FC<{
  activeTab: string;
  setActiveTab: (tab: "stock" | "derivative") => void;
}> = ({ activeTab }) => {
  const { t } = useTranslation();

  return (
    <nav className="navi-container">
      {activeTab === "stock" ? (
        <div className="btn-navi">
          <div className="btn">
            <Link to="/">
              <ButtonDemo color="btncpn-none" isUppercase textColor="white">
                PRICE BOARD
              </ButtonDemo>
            </Link>
          </div>
          <DropDown classNames="w-full" items={Tool}>
            <div className="btn-1">
              {t("ANALYSIS TOOLS")}
              <IconCaretDownFilled
                className="icon-down-drop"
                style={{ width: rem(10), height: rem(10) }}
              />
            </div>
          </DropDown>
          <DropDown items={StockItem1}>
            <div className="btn-1">
              {t("STOCK TRADING")}{" "}
              <IconCaretDownFilled
                className="icon-down-drop"
                style={{ width: rem(10), height: rem(10) }}
              />
            </div>
          </DropDown>
          <DropDown items={STOCK2}>
            <div className="btn-1">
              {t("CASH TRANSACTION")}
              <IconCaretDownFilled
                className="icon-down-drop"
                style={{ width: rem(10), height: rem(10) }}
              />
            </div>
          </DropDown>
          <DropDown items={Asset1}>
            <div className="btn-1">
              {t("ASSET INFOMATION")}
              <IconCaretDownFilled
                className="icon-down-drop"
                style={{ width: rem(10), height: rem(10) }}
              />
            </div>
          </DropDown>
          <div className="btn-2">
            <Link to="/login" className="">
              <ButtonDemo color="btncpn-none" textColor="gray" isUppercase>
                MARGIN MANAGEMENT
              </ButtonDemo>
            </Link>
          </div>
          <DropDown items={Support}>
            <div className="btn-1">
              {t("SUPPORT")}
              <IconCaretDownFilled
                className="icon-down-drop"
                style={{ width: rem(10), height: rem(10) }}
              />
            </div>
          </DropDown>
        </div>
      ) : (
        <div className="btn-navi">
          <div className="btn">
            <Link to="/">
              <ButtonDemo color="btncpn-none" isUppercase>
                PRICE BOARD
              </ButtonDemo>
            </Link>
          </div>
          <DropDown items={Tool}>
            <div className="btn-1"> {t("ANALYSIS TOOLS")}</div>
          </DropDown>
          <DropDown items={StockItem2}>
            <div className="btn-1"> {t("DERIVATIVE TRADING")}</div>
          </DropDown>
          <DropDown items={Cash2}>
            <div className="btn-1"> {t("CASH TRANSACTION")}</div>
          </DropDown>
          <DropDown items={Asset2}>
            <div className="btn-1"> {t("ASSET INFOMATION")}</div>
          </DropDown>
          <div className="btn-2">
            <Link to="/margin" className="">
              <ButtonDemo color="btncpn-none" isUppercase>
                MARGIN MANAGEMENT
              </ButtonDemo>
            </Link>
          </div>
          <DropDown items={Support}>
            <div className="btn-1"> {t("SUPPORT")}</div>
          </DropDown>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
