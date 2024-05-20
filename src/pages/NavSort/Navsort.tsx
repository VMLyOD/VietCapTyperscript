import { ActionIcon, Button, Grid, Tabs } from "@mantine/core";
import SearchBox from "~/components/SearchBox/SearchBox";
import IconSort from "~/components/icon/IconSort";
import "./Style.css";
import DropDown from "~/components/dropdown/dropdown";
import { useTranslation } from "react-i18next";
import { Sort1, Sort2, Sort3, Sort4, Sort5 } from "~/shares/utils/Array";
import ButtonDemo from "~/components/button/buttondemo";
import { HeadSortRight } from "./SortRight";

export interface FavoriteItem {
  value: string;
  label: string;
  link?: string;
  icon?: string;
  textGroup?: string;
}

const Favorite1: FavoriteItem[] = [
  {
    value: "ANALYTICS TOOLS",
    label: "Maket watch",
    link: "/",
    textGroup: "HNX",
  },
  {
    value: "ANALYTICS TOOLS",
    label: "Company information",
    link: "/404",
  },
  {
    value: "ANALYTICS TOOLS",
    label: "Sector information",
    link: "/404",
  },
  {
    value: "ANALYTICS TOOLS",
    label: "VietCap IQ",
    link: "/404",
  },
  {
    value: "HOSE",
    label: "HOSE",
    link: "/404",
  },
];

const Favorite2: FavoriteItem[] = [
  {
    value: "ANALYTICS TOOLS",
    label: "HOSE",
    link: "/404",
  },
  {
    value: "ANALYTICS TOOLS",
    label: "Company information",
    link: "/404",
  },
  {
    value: "ANALYTICS TOOLS",
    label: "Sector information",
    link: "/404",
  },
  {
    value: "ANALYTICS TOOLS",
    label: "VietCap IQ",
    link: "/404",
  },
  {
    value: "HOSE",
    label: "HOSE",
    link: "/404",
  },
];

const Navsort = () => {
  const { t } = useTranslation();
  return (
    <div className="Navsort">
      <div className="left">
        <div className="IconSort">
          <IconSort />
        </div>
        <div className="SearchBox">
          <SearchBox />
        </div>

        <div className="tab-list">
          <div className="bnt-1">
            <DropDown items={Favorite1}>{t("Favorite WatchLists")}</DropDown>
          </div>
          <div className="bnt-2">
            <DropDown items={Sort1}>HOSE</DropDown>
          </div>
          <div className="bnt-2">
            <DropDown items={Sort2}>HNX</DropDown>
          </div>
          <div className="bnt-2">
            <DropDown items={Sort3}>UPCOM</DropDown>
          </div>
          <div className="bnt-2">
            <DropDown items={Sort4}>{t("Futures")}</DropDown>
          </div>
          <div className="bnt-2">
            <ButtonDemo color="btncpn-none">{t("Covered Warrant")}</ButtonDemo>
          </div>
          <div className="bnt-2">
            <DropDown items={Sort5}>{t("Sectors")}</DropDown>
          </div>
          <div className="bnt-2">
            <DropDown items={Favorite2}>{t("Bond")}</DropDown>
          </div>
        </div>
      </div>
      <div className="right h-[30px] w-[100px] bg-slate-500"></div>
    </div>
  );
};

export default Navsort;
