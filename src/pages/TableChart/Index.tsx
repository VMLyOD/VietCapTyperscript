import "ag-grid-enterprise";

import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import {
  valueClassRules,
  valueClassMatVol,
  defaultClassRules,
  tickerClassRules,
  BidClassRules,
  BidClassRules2,
  BidClassRules3,
  AskClassRules,
  AskClassRules2,
  AskClassRules3,
  TVolClassRules,
  default2ClassRules,
  default1ClassRules,
} from "~/shares/color";

import {
  ColDef,
  GridApi,
  GetRowIdParams,
  ITooltipParams,
  CellClickedEvent,
  CellContextMenuEvent,
  FirstDataRenderedEvent,
  ColGroupDef,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  createGrid,
} from "@ag-grid-community/core";
import "./Index.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Style.css";
import GridHeader from "./SortBar/GridHeader";
import { useTheme } from "~/context/ThemeContext";
import { Theme } from "~/context/ThemeContext/themes";
import { DataTablePrice } from "~/services/api/Index";
import { StatsGridIcons } from "./PageComming/Index";
import { menuAgGrid } from "~/shares/MenuGrid/Index";
export interface DataPrice {
  Ticket: React.SetStateAction<string | null>;
  listingInfo: {
    code: string;
    symbol: string;
    ceiling: number;
    floor: number;
    refPrice: number;
    stockType: string;
    type: string;
    receivedTime: string;
    board: string;
    enOrganName: string;
    enOrganShortName: string;
    organName: string;
    organShortName: string;
    ticker: string;
  };
  bidAsk: {
    bidPrices: { price: number; volume: number }[];

    askPrices: { price: number; volume: number }[];
    code: string;
    symbol: string;
    session: string;
    time: string;
    messageType: string;
  };
  matchPrice: {
    marketCode: string;
    code: string;
    symbol: string;
    matchPrice: number;
    matchVol: number;
    highest: number;
    lowest: number;
    foreignBuyVolume: number;
    foreignSellVolume: number;
    foreignBuyValue: number;
    foreignSellValue: number;
    session: string;
    referencePrice: number;
    ceilingPrice: number;
    floorPrice: number;
    accumulatedVolume: number;
    accumulatedValue: number;
    avgMatchPrice: number;
    totalBuyOrders: number;
    totalSellOrders: number;
    currentRoom: number;
    stockType: string;
    board: string;
    matchType: string;
    time: string;
    messageType: string;
  };
  headerName: string;
  field: string;
  cellClassRules: {
    ceil: string;
    floor: string;
    ref: string;
    up: string;
    down: string;
  };
  tooltipValueGetter: () => string;
}

interface CustomColDef extends ColDef {
  children?: CustomColDef[];
}
// const previousCellValues = useRef<{ [key: string]: number }>({});

let gridApi: GridApi | null = null;

const GridComponent: React.FC = () => {
  const [rowData, setRowData] = useState<DataPrice[]>([]);
  const [activeFilter, setActiveFilter] = useState("HOSE");
  const [gridApi, setGridApi] = useState<any>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const detailCellRenderer = useCallback(StatsGridIcons, []);

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        const formattedData = await DataTablePrice(activeFilter);
        setRowData(formattedData);
      } catch (error) {}
    };

    fetchDataAndUpdateState();
    const interval = setInterval(fetchDataAndUpdateState, 500000);

    return () => clearInterval(interval);
  }, [activeFilter]);

  // useEffect(() => {
  //   const fetchDataAndUpdateState = () => {
  //     try {
  //       // Set rowData directly with the imported JSON data
  //       setRowData(jsonData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchDataAndUpdateState();
  //   const interval = setInterval(fetchDataAndUpdateState, 5000);

  //   return () => clearInterval(interval);
  // }, [activeFilter]);

  const columnDefs: (ColDef | CustomColDef)[] = [
    {
      headerName: "Ticker",
      field: "Ticket",
      valueFormatter: "x.toLocaleString()",
      cellClassRules: tickerClassRules(),
      tooltipValueGetter: (params: ITooltipParams) => {
        return params.data.organName;
      },
      chartDataType: "category",
    },
    {
      headerName: "Ceil",
      field: "Ceil",
      cellClassRules: valueClassRules,
      // cellRenderer: "agAnimateShowCellRenderer",
      tooltipValueGetter: () => "Click đúp để đặt lệnh",
      chartDataType: "series",
    },

    {
      headerName: "Ref",
      field: "Ref",
      cellClassRules: valueClassRules,
      tooltipValueGetter: () => "Click đúp để đặt lệnh",
      chartDataType: "series",
    },
    {
      headerName: "Floor",
      field: "Floor",
      cellClassRules: valueClassRules,
      tooltipValueGetter: () => "Click đúp để đặt lệnh",
      chartDataType: "series",
    },

    {
      headerName: "Matched",
      children: [
        {
          headerName: "MatPrice",
          field: "MatPrice",
          cellClassRules: valueClassRules,
          tooltipValueGetter: () => "Click đúp để đặt lệnh",
        },
        {
          headerName: "Vol",
          field: "MatVol",
          cellClassRules: valueClassMatVol,
          tooltipValueGetter: () => "Click đúp để đặt lệnh",
        },
        {
          headerName: "%",
          field: "MatPx",
          valueFormatter: "x.toLocaleString() + '%'",
          cellClassRules: TVolClassRules(),
          tooltipValueGetter: () => "Click đúp để đặt lệnh",
        },
        {
          headerName: "T.Vol.",
          field: "MatTVol",
          cellClassRules: defaultClassRules,
          tooltipValueGetter: () => "Click đúp để đặt lệnh",
        },
      ],
    },
    {
      headerName: "Bid",
      children: [
        {
          headerName: "Price 1",
          field: "BidPrice1",
          cellClassRules: BidClassRules(),
          tooltipValueGetter: () => "Click đúp để đặt lệnh",
        },
        {
          headerName: "Vol 1",
          field: "BidVol1",
          cellClassRules: BidClassRules(),
          tooltipValueGetter: () => "Click đúp để đặt lệnh",
        },
        {
          headerName: "Price 2",
          field: "BidPrice2",
          cellClassRules: BidClassRules2(),
          tooltipValueGetter: () => "Click đúp để đặt lệnh",
        },
        {
          headerName: "Vol 2",
          field: "BidVol2",
          cellClassRules: BidClassRules2(),
          tooltipValueGetter: () => "Click đúp để đặt lệnh",
        },
        {
          headerName: "Price 3",
          field: "BidPrice3",
          cellClassRules: BidClassRules3(),
          tooltipValueGetter: () => "Click đúp để đặt lệnh",
        },
        {
          headerName: "Vol 3",
          field: "BidVol3",
          cellClassRules: BidClassRules3(),
          tooltipValueGetter: () => "Click đúp để đặt lệnh",
        },
      ],
    },

    {
      headerName: "Ask",

      children: [
        {
          headerName: "Price 1",
          field: "AskPrice1",
          // cellRenderer: "agAnimateShowChangeCellRenderer",
          cellClassRules: AskClassRules(),
          tooltipValueGetter: () => "Click đúp để đặt lệnh",
        },
        {
          headerName: "Vol 1",
          field: "AskVol1",
          cellClassRules: AskClassRules(),
          tooltipValueGetter: () => "Click đúp để đặt lệnh",
        },
        {
          headerName: "Price 2",
          field: "AskPrice2",
          cellClassRules: AskClassRules2(),
          tooltipValueGetter: () => "Click đúp để đặt lệnh",
        },
        {
          headerName: "Vol 2",
          field: "AskVol2",
          cellClassRules: AskClassRules2(),
          tooltipValueGetter: () => "Click đúp để đặt lệnh",
        },
        {
          headerName: "Price 3",
          field: "AskPrice3",
          cellClassRules: AskClassRules3(),
          tooltipValueGetter: () => "Click đúp để đặt lệnh",
        },
        {
          headerName: "Vol 3",
          field: "AskVol3",
          cellClassRules: AskClassRules3(),
          tooltipValueGetter: () => "Click đúp để đặt lệnh",
        },
      ],
    },
    {
      headerName: "High",
      field: "High",
      cellClassRules: valueClassRules,
      // cellRenderer: "agAnimateShowCellRenderer",
    },
    {
      headerName: "Avg",
      field: "Avg",
      cellClassRules: valueClassRules,
    },
    {
      headerName: "Low",
      field: "Low",
      cellClassRules: valueClassRules,
    },
    {
      headerName: "Foreign",
      children: [
        {
          headerName: "Bought",
          field: "Bought",
          cellClassRules: default1ClassRules,
          valueFormatter: "x.toLocaleString()",
        },
        {
          headerName: "Sold",
          field: "Sold",
          cellClassRules: default2ClassRules,
          valueFormatter: "x.toLocaleString()",
        },
      ],
    },
  ];

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  // const handleSearchChange = useCallback(
  //   (selectedOption: { value: React.SetStateAction<string | null> }) => {
  //     setSearchValue(selectedOption.value);
  //     if (gridApi) {
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
  //     }
  //   },

  //   [gridApi, rowData]
  // );

  const handleSearchChange = useCallback(
    (selectedOption: { value: string }) => {
      if (!gridApi) return;

      const filteredRowIndex = rowData.findIndex(
        (item) => item.Ticket === selectedOption.value
      );
      console.log("filteredRowIndex: " + filteredRowIndex);
      if (filteredRowIndex !== -1) {
        gridApi.ensureIndexVisible(filteredRowIndex, "middle");
        setTimeout(() => {
          gridApi.flashCells({
            rowNodes: [gridApi.getRowNode(filteredRowIndex)],
            flashDelay: 5000,
          });
        }, 200);
      }
    },
    [gridApi, rowData]
  );

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: true,
      resizable: true,
      flex: 1,
      enableCellChangeFlash: true,
    };
  }, []);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const popupParent = useMemo<HTMLElement | null>(() => {
    return document.body;
  }, []);

  const theme = useTheme();

  const onCellContextMenu = (event: CellContextMenuEvent) => {
    console.log("Right-clicked on cell: ", event.value);
    // event.preventDefault();
  };

  const getRowId = (params: GetRowIdParams) => {
    return params.data.key;
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const tableContainer = document.querySelector(".table-price");
      if (tableContainer) {
        tableContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
  //   params.api.createRangeChart({
  //     cellRange: {
  //       rowStartIndex: 0,
  //       rowEndIndex: 4,
  //       columns: ["Ticket", "Ceil", "Ref", "Floor"],
  //     },
  //     chartType: "groupedColumn",
  //   });
  // }, []);

  const [rowIndexT, setRowIndexT] = useState<string | any>(null);
  const [expandedRowNode, setExpandedRowNode] = useState<any>(null);

  const onFirstDataRendered = useCallback(
    (params: FirstDataRenderedEvent) => {
      setTimeout(() => {
        if (rowIndexT !== null) {
          const rowNode = params.api.getDisplayedRowAtIndex(rowIndexT);
          if (rowNode) {
            rowNode.setExpanded(false);
          }
        }
      }, 0);
    },
    [rowIndexT]
  );

  const onCellClicked = (event: CellClickedEvent) => {
    const newRowIndexT: string | null = event.data.Ticket;
    setRowIndexT(newRowIndexT);

    const newRowNode = event.node;

    if (expandedRowNode && expandedRowNode !== newRowNode) {
      expandedRowNode.setExpanded(false);
    }

    newRowNode.setExpanded(!newRowNode.expanded);
    setExpandedRowNode(newRowNode);
  };

  // const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
  //   setTimeout(() => {
  //     params.api.getDisplayedRowAtIndex(rowIndexT)!.setExpanded(false);
  //   }, 0);
  // }, []);

  // const onCellClicked = (event: CellClickedEvent) => {
  //   const rowIndexT: string | null = event.data.Ticket;
  //   setRowIndexT(rowIndexT);
  //   console.log("rowIndexT", rowIndexT, event);
  //   const rowNode = event.node;
  //   if (rowIndexT) {
  //     rowNode.setExpanded(!rowNode.expanded);
  //   }
  // };

  return (
    <>
      <GridHeader
        gridApi={gridApi}
        rowData={rowData}
        isPlaying={isPlaying}
        onFilterChange={handleFilterChange}
        handleSearchChange={handleSearchChange}
        handleTogglePlay={handleTogglePlay}
      />
      <div className="bg-green-500 h-[2px]"></div>
      <div
        className={
          theme === Theme.Light ? "ag-theme-quartz" : "ag-theme-quartz-dark"
        }
        style={{ height: "100%", minHeight: "652px" }}
      >
        <div
          className="table-price"
          style={{ overflowX: "auto", maxWidth: "100%", height: "100%" }}
        >
          <AgGridReact
            // isRowMaster={isRowMaster}
            getContextMenuItems={menuAgGrid}
            onFirstDataRendered={onFirstDataRendered}
            detailCellRenderer={detailCellRenderer}
            onCellClicked={onCellClicked}
            headerHeight={25}
            masterDetail={true}
            animateRows={false}
            rowHeight={25}
            detailRowHeight={300} //456
            className="ag-root-wrapper ag-layout-normal ag-ltr h-[100%]"
            getRowId={getRowId}
            // getColId={getColId}
            enableRangeSelection={true}
            popupParent={popupParent}
            onGridReady={onGridReady}
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            rowData={rowData}
            suppressMiddleClickScrolls={true}
            cellFlashDuration={1000}
            // enableRangeSelection={true}
            enableCharts={true}
            tooltipShowDelay={0}
            debounceVerticalScrollbar={false}
            onCellContextMenu={onCellContextMenu}
            tooltipHideDelay={20000}
            // popupParent={popupParent}
            // debounceVerticalScrollbar={true}
            // alwaysShowHorizontalScroll={true}
            // alwaysShowVerticalScroll={true}
          />
        </div>
      </div>
    </>
  );
};

export default GridComponent;
