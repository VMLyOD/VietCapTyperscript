import { ActionIcon, Button, Grid, Tabs } from "@mantine/core";
import SearchBox from "~/components/SearchBox/SearchBox";
import IconSort from "~/components/icon/IconSort";
import "./Style.css";
import DropDown from "~/components/dropdown/dropdown";

export interface FavoriteItem {
  value: string;
  label: string;
  link: string;
  icon?: string;
}

const Favorite: FavoriteItem[] = [
  {
    value: "ANALYTICS TOOLS",
    label: "Maket watch",
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
  {
    value: "ANALYTICS TOOLS",
    label: "VN30",
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
];

const Navsort = () => {
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
            <DropDown items={Favorite}>Favorite WatchLists</DropDown>
          </div>
          <div className="bnt-2">
            <DropDown items={Favorite}>HOSE</DropDown>
          </div>
          <div className="bnt-2">
            <DropDown items={Favorite}>HNX</DropDown>
          </div>
          <div className="bnt-2">
            <DropDown items={Favorite}>UPCOM</DropDown>
          </div>
          <div className="bnt-2">
            <DropDown items={Favorite}>Futures</DropDown>
          </div>
          <div className="bnt-2">
            <DropDown items={Favorite}>Covered Warrant</DropDown>
          </div>
          <div className="bnt-2">
            <DropDown items={Favorite}>Sectors</DropDown>
          </div>
          <div className="bnt-2">
            <DropDown items={Favorite}>Bond</DropDown>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Navsort;
