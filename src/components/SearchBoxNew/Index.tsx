import {
  Autocomplete,
  AutocompleteProps,
  Group,
  Text,
  rem,
} from "@mantine/core";
import { IconComponents } from "@tabler/icons-react";
import classes from "./Demo.module.css";

interface Props {
  rowData: any;
}
export const SearchBarNew: React.FC<Props> = ({ rowData }) => {
  console.log("rowData: ", rowData);
  const dataDropSearch = rowData.reduce(
    (newObj: any, currentItem: any, index: number) => ({
      ...newObj,
      [currentItem?.listingInfo?.Ticket]: {
        Ticket: currentItem?.listingInfo.Ticket,
        organName: currentItem?.listingInfo.organName,
        Board: currentItem?.listingInfo.Board,
      },
    }),
    {}
  );

  const renderDropdownOption: AutocompleteProps["renderOption"] = ({
    option,
  }) => (
    <Group gap="sm" className={classes.Group}>
      <div>
        <Text size="sm">
          {option.value} - {dataDropSearch[option.value].Board}
        </Text>
        <Text size="xs">{dataDropSearch[option.value].organName}</Text>
      </div>
    </Group>
  );

  const icon = <IconComponents style={{ width: rem(16), height: rem(16) }} />;

  return (
    <Autocomplete
      classNames={classes}
      data={rowData.map((row: any) => row?.listingInfo?.symbol)}
      maxDropdownHeight={300}
      renderOption={renderDropdownOption}
      placeholder="Tìm kiếm..."
      h={28}
      w={120}
      radius="4px"
      rightSection={icon}
      comboboxProps={{ dropdownPadding: 20 }}
    />
  );
};
