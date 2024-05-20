import { useEffect, useState } from "react";
import { Combobox, InputBase, useCombobox } from "@mantine/core";
import SearchImg from "./SearchImg";
import "./Style.css";
import data from "~/AllAPI.json";
import { spawn } from "child_process";

const SearchBox: React.FC = () => {
  const [symbols, setSymbols] = useState<string[]>([]);

  useEffect(() => {
    setSymbols(data.map((item) => item.symbol).slice(0, 5000));
  }, []);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const shouldFilterOptions = symbols.every((item) => item !== search);
  const filteredOptions = shouldFilterOptions
    ? symbols.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase().trim())
      )
    : symbols;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item} className="custom-option">
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val);
        setSearch(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          className="input-base text-white"
          c="blue"
          variant="outline"
          rightSection={<SearchImg />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || "");
          }}
          placeholder="Search..."
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown className="combox-drop">
        <div
          style={{ maxHeight: "150px", overflow: "auto", background: "none" }}
        >
          <Combobox.Options className="combox-opt">
            {options.length > 0 ? (
              options
            ) : (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            )}
          </Combobox.Options>
        </div>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SearchBox;
