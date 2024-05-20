// DropdownItem.tsx
import React from "react";
import "./Style.css";

import { IconCaretDownFilled } from "@tabler/icons-react";
import { rem } from "@mantine/core";

interface DropdownItemProps {
  filterOptions: string[];
  activeOption: string;
  isActive: boolean;
  handleOptionClick: (filter: string, index: number) => void;
  className?: string;
  size?: "small" | "medium" | "large";
}

function convertSymbol(activeOption: string) {
  if (activeOption === "FU_INDEX") {
    return "Gov. Bond Futures";
  } else if (activeOption === "ODD_LOT") {
    return "Odd lot HOSE";
  } else if (activeOption === "FU_BOND") {
    return "Futures";
  } else {
    return activeOption;
  }
}
function convertfilter(filter: string) {
  if (filter === "FU_INDEX") {
    return "Gov. Bond Futures";
  } else if (filter === "ODD_LOT") {
    return "Odd lot HOSE";
  } else if (filter === "FU_BOND") {
    return "Futures";
  } else {
    return filter;
  }
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  filterOptions,
  activeOption,
  isActive,
  handleOptionClick,
}) => {
  return (
    <div className="dropdown2">
      <div className={`bnt-1 ${isActive ? "active-bnt-11" : ""}`}>
        <button className="dropbtn">
          {convertSymbol(activeOption)}
          <IconCaretDownFilled
            className="icon-down-drop"
            style={{ width: rem(13), height: rem(13) }}
          />
        </button>
        <div className="dropdown-content4">
          <li>
            {filterOptions.map((filter, index) => (
              <button
                key={filter}
                onClick={() => handleOptionClick(filter, index)}
                className={activeOption === filter ? "active" : ""}
              >
                {convertfilter(filter)}
              </button>
            ))}
          </li>
        </div>
      </div>
    </div>
  );
};

export default DropdownItem;
