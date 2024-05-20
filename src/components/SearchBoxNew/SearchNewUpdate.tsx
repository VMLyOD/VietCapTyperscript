// import { TextInput, useCombobox } from "@mantine/core";
// import { useState } from "react";
// export function AutocompleteSelectFirstOption({rowData}) {
//   const combobox = useCombobox({
//     onDropdownClose: () => combobox.resetSelectedOption(),
//   });

//   const [value, setValue] = useState("");
//   const shouldFilterOptions = !rowData.some(
//     (item) => item.listingInfo.organName === value
//   );

//   const dataValue = rowData.map((item) => ({
//     [item.listingInfo.symbol + item.listingInfo.organName]: {
//       symbol: item.listingInfo.symbol,
//       organName: item.listingInfo.organName,
//       board: item.listingInfo.board,
//     },
//   }));

//   const filteredOptions = shouldFilterOptions
//     ? dataValue.filter((item) =>
//         Object.keys(item)[0].toLowerCase().includes(value.toLowerCase().trim())
//       )
//     : dataValue;

//   const options = filteredOptions.map((item: any, index: number) => {
//     const key = Object.keys(item)[0];

//     return (
//       <Combobox.Option value={key} key={index}>
//         <Text>
//           {item[key].symbol} - {item[key].board}
//         </Text>
//         <Text>{item[key].organName}</Text>
//       </Combobox.Option>
//     );
//   });

//   useEffect(() => {
//     combobox.selectFirstOption();
//   }, [value]);

//   return (
//     <Combobox
//       onOptionSubmit={(optionValue) => {
//         setValue(optionValue);
//         combobox.closeDropdown();
//       }}
//       store={combobox}
//       withinPortal={false}
//     >
//       <Combobox.Target>
//         <TextInput
//           placeholder="Pick value or type anything"
//           value={value}
//           onChange={(event) => {
//             setValue(event.currentTarget.value);
//             combobox.openDropdown();
//           }}
//           onClick={() => combobox.openDropdown()}
//           onFocus={() => combobox.openDropdown()}
//           onBlur={() => combobox.closeDropdown()}
//         />
//       </Combobox.Target>

//       <Combobox.Dropdown>
//         <Combobox.Options>
//           {options.length === 0 ? (
//             <Combobox.Empty>Nothing found</Combobox.Empty>
//           ) : (
//             options
//           )}
//         </Combobox.Options>
//       </Combobox.Dropdown>
//     </Combobox>
//   );
// }
