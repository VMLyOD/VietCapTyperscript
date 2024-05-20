import {
  Autocomplete,
  AutocompleteProps,
  Group,
  Text,
  rem,
  Combobox,
} from "@mantine/core";

import { TextInput, useCombobox } from "@mantine/core";
import cx from "clsx";
import { useEffect, useState } from "react";
const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;
import jsonData from "~/TablePrice.json";
import { IconSearch } from "@tabler/icons-react";
import classes from "./Search.module.css";

interface SearchProps {
  handleSearchChange: () => void;
  rowData: any;
}

// export const Demo: React.FC<SearchProps> = ({ handleSearchChange, rowData }) => {

//   const autocompleteData = rowData.reduce(
//     (newObj, currentItem) => ({
//       ...newObj,
//       [currentItem?.listingInfo?.symbol]: {
//         symbol: currentItem?.listingInfo.symbol,
//         organName: currentItem?.listingInfo.organName,
//         board: currentItem?.listingInfo.board,
//       },
//     }),
//     {}
//   );

//   const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({
//     option,
//   }) => (
//     <Group gap="sm" __size="300px">
//       <div>
//         <Text size="sm">
//           {option.value} - {autocompleteData[option.value].board}
//         </Text>
//         <Text size="xs">{autocompleteData[option.value].organName}</Text>
//       </div>
//     </Group>
//   );

//   const icon = <img src="/assets/icon/dark/search.svg" />;

//   return (
//     <>
//       <Autocomplete
//         classNames={classes}
//         onChange={handleSearchChange}
//         data={rowData.map((symbol) => symbol?.listingInfo?.symbol)}
//         maxDropdownHeight={300}
//         renderOption={renderAutocompleteOption}
//         placeholder="Tìm kiếm..."
//         radius="4px"
//         rightSection={icon}
//         comboboxProps={{
//           position: "bottom-start",
//           middlewares: { flip: false, shift: false, inline: false },
//           size: "lg",
//           width: "300px",
//         }}
//         variant="default"
//         size="xs"
//       />
//     </>
//   );
// };

// const autocompleteData = jsonData.reduce(
//   (newObj, currentItem) => ({
//     ...newObj,
//     [currentItem?.listingInfo.symbol]: {
//       symbol: currentItem?.listingInfo.symbol,
//       organName: currentItem?.listingInfo.organName,
//       board: currentItem?.listingInfo.board,
//     },
//   }),
//   []
// );

export const AutocompleteSelectFirstOption: React.FC<SearchProps> = ({
  handleSearchChange,
  rowData,
}) => {
  const [animating, setAnimating] = useState(false);
  const [value, setValue] = useState("");

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setAnimating(false);
    },

    onDropdownOpen: () => setAnimating(true),
  });

  const shouldFilterOptions = !rowData.some(
    (item: { organName: string }) => item.organName === value
  );

  const dataValue = rowData.map(
    (item: { organName: string; Ticket: string; Board: string }) => ({
      [item.Ticket + " - " + item.organName]: {
        symbol: item.Ticket,
        organName: item.organName,
        board: item.Board,
      },
    })
  );

  const filteredOptions = shouldFilterOptions
    ? dataValue.filter((item: {}) =>
        Object.keys(item)[0].toLowerCase().includes(value.toLowerCase().trim())
      )
    : dataValue;

  const options = filteredOptions.map((item: any, index: number) => {
    const key = Object.keys(item)[0];

    return (
      <Combobox.Option
        className={cx({ [classes.animateOption]: animating })}
        classNames={{ option: classes.option }}
        value={key}
        key={index}
      >
        <div>
          <Text size="sm">
            {item[key].symbol} - {item[key].board}
          </Text>
          <Text size="xs">{item[key].organName}</Text>
        </div>
      </Combobox.Option>
    );
  });

  // useEffect(() => {
  //   combobox.selectFirstOption();
  // }, [value]);

  return (
    <Combobox
      dropdownPadding={1}
      width={500}
      radius={4}
      position="bottom-start"
      styles={{
        dropdown: { alignItems: "center" },
        empty: {
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--mantine-color-gray_100-filled",
        },
      }}
      middlewares={{ flip: true, shift: true, inline: true }}
      // transitionProps={{ duration: 200, transition: "pop" }}
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        console.log(optionValue);
        handleSearchChange;
        combobox.closeDropdown();
      }}
      store={combobox}
      withinPortal={true}
    >
      <Combobox.Target>
        <TextInput
          bg={"var(--mantine-color-transparent_20-filled)"}
          variant="basic"
          size="xs"
          color="var(--mantine-color-gray_100-filled)"
          classNames={{
            root: classes.root,
            input: classes.input,
            wrapper: classes.wrapper,
            section: classes.section,
          }}
          rightSection={icon}
          // className={classes.input}
          placeholder="Search..."
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            handleSearchChange;
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown variant="unstyled" className={classes.dropdown}>
        <Combobox.Options>
          {options.length === 0 ? (
            <Combobox.Empty className={classes.empty}>
              Không kết quả
            </Combobox.Empty>
          ) : (
            options
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

// import {
//   Autocomplete,
//   AutocompleteProps,
//   Group,
//   Text,
//   rem,
//   Combobox,
// } from "@mantine/core";

// import { TextInput, useCombobox } from "@mantine/core";
// import cx from "clsx";
// import { useEffect, useState } from "react";
// import { IconSearch } from "@tabler/icons-react";
// import jsonData from "~/TablePrice.json";
// import classes from "./Search.module.css";

// interface SearchProps {
//   handleSearchChange: (selectedOption: { value: string }) => void;
//   rowData: any;
// }

// export const AutocompleteSelectFirstOption: React.FC<SearchProps> = ({
//   handleSearchChange,
//   rowData,
// }) => {
//   const [searchValue, setSearchValue] = useState<string>("");

//   useEffect(() => {
//     console.log("Fetching data", rowData);
//     setSearchValue(rowData);
//   }, []);

//   const autocompleteData = rowData.reduce(
//     (
//       newObj: any,
//       currentItem: { Symbol: any; organName: any; Board: any }
//     ) => ({
//       ...newObj,
//       [currentItem?.Symbol]: {
//         symbol: currentItem?.Symbol,
//         organName: currentItem?.organName,
//         board: currentItem?.Board,
//       },
//     }),
//     {}
//   );

//   const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({
//     option,
//   }) => (
//     <Group gap="sm" __size="300px">
//       <div>
//         <Text size="sm">
//           {option.value} - {autocompleteData[option.value].Board}
//         </Text>
//         <Text size="xs">{autocompleteData[option.value].organName}</Text>
//       </div>
//     </Group>
//   );

//   const icon = <img src="/assets/icon/dark/search.svg" />;

//   const handleSearchInputChange = (value: string) => {
//     setSearchValue(value);
//     handleSearchChange({ value });
//   };

//   return (
//     <>
//       <Autocomplete
//         classNames={classes}
//         onChange={handleSearchInputChange}
//         data={rowData.map((item: { Symbol: any }) => item?.Symbol)}
//         maxDropdownHeight={300}
//         renderOption={renderAutocompleteOption}
//         placeholder="Tìm kiếm..."
//         radius="4px"
//         rightSection={icon}
//         comboboxProps={{
//           position: "bottom-start",
//           middlewares: { flip: false, shift: false, inline: false },
//           size: "lg",
//           width: "300px",
//         }}
//         variant="default"
//         size="xs"
//       />
//     </>
//   );
// };

// // Component cha truyền `handleSearchChange` và `rowData`

// const ParentComponent = () => {
//   const [rowData, setRowData] = useState<any[]>([]);
//   const [gridApi, setGridApi] = useState<any>(null);

//   useEffect(() => {
//     setRowData(jsonData);
//     // Giả định gridApi được khởi tạo ở đâu đó trong ParentComponent
//   }, []);

//   const handleSearchChange = useCallback(
//     (selectedOption: { value: string }) => {
//       if (!gridApi) return;

//       const filteredRowIndex = rowData.findIndex(
//         (item) => item.Ticket === selectedOption.value
//       );
//       console.log("filteredRowIndex: " + filteredRowIndex);
//       if (filteredRowIndex !== -1) {
//         gridApi.ensureIndexVisible(filteredRowIndex, "middle");
//         setTimeout(() => {
//           gridApi.flashCells({
//             rowNodes: [gridApi.getRowNode(filteredRowIndex)],
//             flashDelay: 5000,
//           });
//         }, 200);
//       }
//     },
//     [gridApi, rowData]
//   );

//   return (
//     <Demo handleSearchChange={handleSearchChange} rowData={rowData} />
//   );
// };

// export default ParentComponent;
