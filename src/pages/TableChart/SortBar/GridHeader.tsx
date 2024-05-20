//GridHeader.tsx

import React, { useState } from "react";
import IconSort from "~/components/icon/IconSort";
import FilterDropdown from "./FilterDropdown";
import { HeadSortRight } from "../../NavSort/SortRight";
import Select from "react-select";
import { IoSearchOutline } from "react-icons/io5";
import { customStyles } from "~/shares/style";
import { AutocompleteSelectFirstOption } from "./SearchBarNew/Index";

interface GridHeaderProps {
  onFilterChange: (filter: string) => void;
  rowData: any;
  gridApi: any;
  handleSearchChange: any;
  isPlaying: boolean;
  handleTogglePlay: () => void;
}

interface SearchResult {
  symbol: string;
  board: string;
  organName: string;
  id: string;
  organShortName: string;
}

const GridHeader: React.FC<GridHeaderProps> = ({
  onFilterChange,
  rowData,
  handleSearchChange,
  handleTogglePlay,
  isPlaying,
}) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  return (
    <div className="Navsort">
      <div className="left">
        <div className="IconSort">
          <IconSort />
        </div>
        <div className="SearchBox h-[30px] flex">
          {/* <Select
            classNamePrefix="custom-select"
            options={rowData.map((item: any) => ({
              value: item.Ticket,
              label: item.Ticket + " - " + item.Board + "\n" + item.organName,
            }))}
            components={{ DropdownIndicator: IoSearchOutline }}
            placeholder="search..."
            onChange={handleSearchChange}
            styles={customStyles}
          /> */}

          {/* <Demo handleSearchChange={handleSearchChange} /> */}
          <AutocompleteSelectFirstOption
            rowData={rowData}
            handleSearchChange={handleSearchChange}
          />
        </div>
        <div className="tab-list">
          <FilterDropdown
            filterOptions1={[
              "HOSE",
              "VN30",
              "VNMidCap",
              "VNSmallCap",
              "VNAllShare",
              "VN100",
              "ETF",
              "ODD_LOT",
            ]}
            filterOptions2={[
              "HNX",
              "HNX30",
              "HNXCon",
              "HNXFin",
              "HNXLCap",
              "HNXMSCap",
              "HNXMan",
            ]}
            filterOptions3={["UPCOM"]}
            filterOptions4={["FU_BOND", "FU_INDEX"]}
            filterOptions5={["Danh mục quan tâm", "Tạo danh mục mới"]}
            filterOptions6={["All Vector", "LMAO", "Dark"]}
            onFilterChange={onFilterChange}
          />
        </div>
        <div className="h-[30px] w-[120px]"></div>
      </div>
      <div
        className="right h-[30px]  flex items-center justify-evenly mr-3"
        style={{ columnGap: "4px" }}
      >
        <HeadSortRight
          handleTogglePlay={handleTogglePlay}
          isPlaying={isPlaying}
        ></HeadSortRight>
      </div>
    </div>
  );
};

export default GridHeader;
