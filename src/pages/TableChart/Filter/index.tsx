// import { Button } from "antd";

// export const MyFilter = ({ rowData, gridApi }) => {
//   const ensureNameVisible = (symbol: any, position = "middle") => {
//     const index = rowData.findIndex(
//       (row: { symbol: any }) => row.symbol === symbol
//     );
//     var rowNode1 = gridApi!.getDisplayedRowAtIndex(index)!;

//     if (gridApi) {
//       if (index !== -1) {
//         gridApi.ensureIndexVisible(index, position);
//       }
//     }
//     gridApi!.flashCells({ flashDuration: 300, rowNodes: [rowNode1] });
//   };

//   return <Button onClick={() => ensureNameVisible("VCI")}>Scroll</Button>;
// };
