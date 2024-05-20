// TickerColumn.tsx
import React from "react";
import { ValueGetterParams } from "ag-grid-community";

interface TickerColumnProps {
  params: ValueGetterParams;
}

const TickerColumn: React.FC<TickerColumnProps> = ({ params }) => {
  let textColor = "#FFD60A";
  const bidPrices = params.data.matchPrice.matchPrice;
  const refPrice = params.data.listingInfo.refPrice;

  if (refPrice !== undefined && bidPrices !== undefined) {
    if (bidPrices === refPrice) {
      textColor = "#FFD60A";
    } else if (bidPrices < refPrice) {
      textColor = "#FF2626";
    } else {
      textColor = "#32D74B";
    }
  }

  return (
    <div style={{ color: textColor }}>{params.data.listingInfo.ticker}</div>
  );
};

export default TickerColumn;
