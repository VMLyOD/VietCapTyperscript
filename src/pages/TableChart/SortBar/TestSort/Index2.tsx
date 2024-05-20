// GridComponent.tsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ValueGetterParams } from "ag-grid-community";
import "./Index.css";
import GridHeader from "../GridHeader";
import GridRow from "../GridRow";
import "./Style.css";
import "./Index.css";

interface Data {
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
}
const GridComponent2: React.FC = () => {
  const [rowData, setRowData] = useState<Data[]>([]);
  const previousDataRef = useRef<Data[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("HOSE");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const symbolsResponse = await fetch(
          `https://mt.vietcap.com.vn/api/price/symbols/getByGroup?group=${activeFilter}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const symbols = await symbolsResponse.json();

        const response = await fetch(
          "https://mt-qc.vietcap.int/api/price/symbols/getList",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              symbols: symbols.map((symbolObj: any) => symbolObj.symbol),
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setRowData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, [activeFilter]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const columnDefs: ColDef<Data>[] = [
    {
      headerName: "Ticker",
      valueGetter: (params: ValueGetterParams) =>
        params.data.listingInfo.ticker,
    },
    {
      headerName: "Ceil",
      valueGetter: (params: ValueGetterParams) =>
        params.data.listingInfo.ceiling.toLocaleString().slice(0, -1),
    },
    {
      headerName: "Ref",
      valueGetter: (params: ValueGetterParams) =>
        params.data.listingInfo.refPrice.toLocaleString().slice(0, -1),
    },
    {
      headerName: "Floor",
      valueGetter: (params: ValueGetterParams) =>
        params.data.listingInfo.floor.toLocaleString().slice(0, -1),
    },
    {
      headerName: "Matched",
      children: [
        {
          headerName: "Price",
          valueGetter: (params: ValueGetterParams) =>
            params.data.matchPrice.matchPrice.toLocaleString().slice(0, -1) ||
            "",
        },
        {
          headerName: "Vol",
          valueGetter: (params: ValueGetterParams) => {
            const Tvol = params.data.matchPrice.matchVol.toLocaleString() || "";

            if (Tvol == 0 && Tvol !== undefined) {
              return "";
            } else {
              return Tvol;
            }
          },
        },
        {
          headerName: "%",
          valueGetter: (params: ValueGetterParams) => {
            const refPrice = params.data.listingInfo.refPrice;
            const matchPrice = params.data.matchPrice.matchPrice;
            // console.log(refPrice, matchPrice);

            if (
              matchPrice !== 0 &&
              matchPrice !== undefined &&
              refPrice !== undefined &&
              refPrice !== 0
            ) {
              return (
                (((matchPrice - refPrice) / refPrice) * 100).toFixed(2) + "%"
              );
            } else {
              return "";
            }
          },
          cellClassRules: {
            "green-cell": (params: ValueGetterParams) => {
              const refPrice = params.data.listingInfo.refPrice;
              const matchPrice = params.data.matchPrice.matchPrice;
              if (
                matchPrice !== 0 &&
                matchPrice !== undefined &&
                refPrice !== undefined &&
                refPrice !== 0
              ) {
                return ((matchPrice - refPrice) / refPrice) * 100 > 0;
              }
              return false;
            },
            "red-cell": (params: ValueGetterParams) => {
              const refPrice = params.data.listingInfo.refPrice;
              const matchPrice = params.data.matchPrice.matchPrice;
              if (
                matchPrice !== 0 &&
                matchPrice !== undefined &&
                refPrice !== undefined &&
                refPrice !== 0
              ) {
                return ((matchPrice - refPrice) / refPrice) * 100 < 0;
              }
              return false;
            },
          },
        },
        {
          headerName: "T.Vol.",
          valueGetter: (params: ValueGetterParams) => {
            const Tvol =
              params.data.matchPrice.accumulatedVolume.toLocaleString() || "";

            if (Tvol == 0 && Tvol !== undefined) {
              return "";
            } else {
              return Tvol;
            }
          },
        },
      ],
    },
    {
      headerName: "Bid",
      children: [
        {
          headerName: "Price 1",
          valueGetter: (params: ValueGetterParams) =>
            params.data.bidAsk.bidPrices[0]?.price
              .toLocaleString()
              .slice(0, -1),
        },

        {
          headerName: "Vol1",
          valueGetter: (params: ValueGetterParams) =>
            params.data.bidAsk.bidPrices[0]?.volume.toLocaleString(),
        },

        {
          headerName: "Price 2",
          valueGetter: (params: ValueGetterParams) =>
            params.data.bidAsk.bidPrices[1]?.price
              .toLocaleString()
              .slice(0, -1),
        },
        {
          headerName: "Vol2",
          valueGetter: (params: ValueGetterParams) =>
            params.data.bidAsk.bidPrices[1]?.volume.toLocaleString(),
        },
        {
          headerName: "Price 3",
          valueGetter: (params: ValueGetterParams) =>
            params.data.bidAsk.bidPrices[2]?.price
              .toLocaleString()
              .slice(0, -1),
        },
        {
          headerName: "Vol3",
          valueGetter: (params: ValueGetterParams) =>
            params.data.bidAsk.bidPrices[2]?.volume.toLocaleString(),
        },
      ],
    },
    {
      headerName: "Ask",
      children: [
        {
          headerName: "Price 1",
          valueGetter: (params: ValueGetterParams) =>
            params.data.bidAsk.askPrices[0]?.price
              .toLocaleString()
              .slice(0, -1),
        },
        {
          headerName: "Vol1",
          valueGetter: (params: ValueGetterParams) =>
            params.data.bidAsk.askPrices[0]?.volume.toLocaleString(),
        },
        {
          headerName: "Price 2",
          valueGetter: (params: ValueGetterParams) =>
            params.data.bidAsk.askPrices[1]?.price
              .toLocaleString()
              .slice(0, -1),
        },
        {
          headerName: "Vol2",
          valueGetter: (params: ValueGetterParams) =>
            params.data.bidAsk.askPrices[1]?.volume.toLocaleString(),
        },
        {
          headerName: "Price 3",
          valueGetter: (params: ValueGetterParams) =>
            params.data.bidAsk.askPrices[2]?.price
              .toLocaleString()
              .slice(0, -1),
        },
        {
          headerName: "Vol3",
          valueGetter: (params: ValueGetterParams) =>
            params.data.bidAsk.askPrices[2]?.volume.toLocaleString(),
        },
      ],
    },
    {
      headerName: "Hight",
      valueGetter: (params: ValueGetterParams) =>
        params.data.matchPrice.highest.toLocaleString().slice(0, -1),
    },
    {
      headerName: "Avg",
      valueGetter: (params: ValueGetterParams) =>
        params.data.matchPrice.avgMatchPrice.toLocaleString().slice(0, -4),
    },
    {
      headerName: "Low",
      valueGetter: (params: ValueGetterParams) =>
        params.data.matchPrice.lowest.toLocaleString().slice(0, -1),
    },
  ];

  useEffect(() => {
    previousDataRef.current = rowData;
  }, [rowData]);

  const defaultColDef = useMemo(() => {
    return {
      width: 100,
      sortable: true,
      resizable: true,
      flex: 1,
    };
  }, []);

  return (
    <div className="ag-theme-alpine-dark" style={{ height: "70vh" }}>
      <GridHeader onFilterChange={handleFilterChange} />
      <div className="bg-green-500 h-[2px]"></div>
      <AgGridReact
        className="ag-root-wrapper ag-layout-normal ag-ltr h-[100%]"
        defaultColDef={defaultColDef}
        rowData={rowData}
        columnDefs={columnDefs}
      />
    </div>
  );
};

export default GridComponent2;
