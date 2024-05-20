import React, { useState } from "react";
import "../Style.css";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { Button, rem } from "@mantine/core";
import DropdownItem from "~/components/dropdown/DropdownSort/Index";
import ButtonDemo from "~/components/button/buttondemo";
import "./TestSort/dropdown.css";

function convertSymbol(filter: string) {
  if (filter === "HNXUpcomIndex") {
    return "UPCOM";
  } else if (filter === "VNINDEX") {
    return "VN";
  } else if (filter === "HNXIndex") {
    return "HNX";
  } else {
    return filter;
  }
}

interface FilterDropdownProps {
  filterOptions1: string[];
  filterOptions2: string[];
  filterOptions3: string[];
  filterOptions4: string[];
  filterOptions5: string[];
  filterOptions6: string[];
  onFilterChange: (filter: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  filterOptions1,
  filterOptions2,
  filterOptions3,
  filterOptions4,
  filterOptions5,
  filterOptions6,
  onFilterChange,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const initialActiveOptions = [
    filterOptions1[0],
    filterOptions2[0],
    filterOptions3[0],
    filterOptions4[0],
    filterOptions5[0],
    filterOptions6[0],
  ];
  const [activeOptions, setActiveOptions] =
    useState<string[]>(initialActiveOptions);

  const handleOptionClick = (filter: string, index: number) => {
    setActiveIndex(index);
    const newActiveOptions = [...activeOptions];
    newActiveOptions[index] = filter;
    setActiveOptions(newActiveOptions);
    onFilterChange(filter);
  };

  return (
    <>
      <DropdownItem
        className="custom-dropdown2"
        size="small"
        filterOptions={filterOptions5}
        activeOption={activeOptions[4]}
        isActive={activeIndex === 4}
        handleOptionClick={(filter, index) => handleOptionClick(filter, 4)}
      />
      <DropdownItem
        filterOptions={filterOptions1}
        activeOption={activeOptions[0]}
        isActive={activeIndex === 0}
        handleOptionClick={(filter, index) => handleOptionClick(filter, 0)}
      />
      <DropdownItem
        filterOptions={filterOptions2}
        activeOption={activeOptions[1]}
        isActive={activeIndex === 1}
        handleOptionClick={(filter, index) => handleOptionClick(filter, 1)}
      />
      <DropdownItem
        filterOptions={filterOptions3}
        activeOption={activeOptions[2]}
        isActive={activeIndex === 2}
        handleOptionClick={(filter, index) => handleOptionClick(filter, 2)}
      />
      <DropdownItem
        filterOptions={filterOptions4}
        activeOption={activeOptions[3]}
        isActive={activeIndex === 3}
        handleOptionClick={(filter, index) => handleOptionClick(filter, 3)}
      />
      <ButtonDemo
        size="btncpn-small"
        textColor="gray"
        className="button-nav-sort"
      >
        Covered Warrant
      </ButtonDemo>
      <DropdownItem
        filterOptions={filterOptions6}
        activeOption={activeOptions[5]}
        isActive={activeIndex === 5}
        handleOptionClick={(filter, index) => handleOptionClick(filter, 5)}
      />
    </>
  );
};

export default FilterDropdown;
