// GridRow.tsx
import React from "react";

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

interface GridRowProps {
  rowData: Data;
}

const GridRow: React.FC<GridRowProps> = ({ rowData }) => {
  return (
    <div className="grid-row">
      <div>Ticker: {rowData.listingInfo.ticker}</div>
      <div>Ceiling: {rowData.listingInfo.ceiling}</div>
      <div>Reference Price: {rowData.listingInfo.refPrice}</div>
    </div>
  );
};

export default GridRow;
