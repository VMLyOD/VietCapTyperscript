import {
  GetContextMenuItemsParams,
  MenuItemDef,
} from "@ag-grid-community/core";

export function menuAgGrid(
  params: GetContextMenuItemsParams
): (string | MenuItemDef)[] {
  //   const history = useHistory();

  const result: (string | MenuItemDef)[] = [
    {
      icon: '<img src="/assets/icon/infomation.svg"/>',
      name: "Thông tin doanh nghiệp ",
      action: () => {
        // history.push("/login");
      },
      cssClasses: ["red", "bold"],
    },
    {
      name: "Chỉ số kỹ thuật",
      icon: '<img className="bg-white" src="/assets/icon/technique.svg"/>',
    },
    {
      icon: '<img src="/assets/icon/infomation.svg"/>',
      name: "Cảnh báo giá",
      action: () => {}, // history.push("/login"),
      cssClasses: ["red", "bold"],
    },
    "separator",
    {
      name: "Checked",
      checked: true,
      action: () => {
        console.log("Checked Selected");
      },
      icon: '<img src="https://www.ag-grid.com/example-assets/skills/mac.png"/>',
    },
    "copy",
    "separator",
    "chartRange",
  ];

  return result;
}
