import { useListState } from "@mantine/hooks";
import { Checkbox } from "@mantine/core";
import { IndeterminateCheckboxProps } from "~/shares/Interface/Index";

export const IndeterminateCheckbox: React.FC<IndeterminateCheckboxProps> = ({
  textLable,
  labeData,
}) => {
  const [values, handlers] = useListState(labeData);

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const items = values.map((value, index) => (
    <Checkbox
      color="var(--mantine-color-primary-filled)"
      mt="xs"
      ml={33}
      label={value.label}
      key={value.key}
      checked={value.checked}
      onChange={(event) =>
        handlers.setItemProp(index, "checked", event.currentTarget.checked)
      }
    />
  ));

  return (
    <div className="mt-1">
      <Checkbox
        color="var(--mantine-color-primary-filled)"
        checked={allChecked}
        indeterminate={indeterminate}
        label={textLable}
        onChange={() =>
          handlers.setState((current) =>
            current.map((value) => ({ ...value, checked: !allChecked }))
          )
        }
      />
      {items}
    </div>
  );
};
