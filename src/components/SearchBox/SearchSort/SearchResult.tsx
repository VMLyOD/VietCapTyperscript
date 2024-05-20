// // SearchResult.tsx

// import React, { useCallback, useState } from "react";
// import "./SearchResult.css";

// interface SearchResultProps {
//   result: {
//     symbol: string;
//     board: string;
//     organName: string;
//     id: string;
//     organShortName: string;
//   };
//   gridApi?: any;
//   rowData?: any;
// }

// export const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
//   return (
//     <div className="search-result">
//       <div className="search-content">
//         <p>
//           {result.symbol} - {result.board}
//         </p>
//         <p>{result.organName}</p>
//       </div>
//     </div>
//   );
// };

import React from "react";
import "./SearchResult.css";

interface SearchResultProps {
  result: {
    symbol: string;
    board: string;
    organName: string;
    id: string;
    organShortName: string;
  };
  gridApi?: any;
  rowData?: any[];
}

export const SearchResult: React.FC<SearchResultProps> = ({
  result,
  gridApi,
  rowData,
  handleSearchChange,
}) => {
  const handleClick = () => {
    if (gridApi && rowData) {
      const filteredRowIndex = rowData.findIndex(
        (item) => item.Ticket === rowData.Ticket
      );

      if (filteredRowIndex !== -1) {
        gridApi.ensureIndexVisible(filteredRowIndex, "middle");
        gridApi.flashCells({
          rowNodes: [gridApi.getRowNode(filteredRowIndex)],
          flashDelay: 1500,
        });
      }
    }
    console.log("bruh");
  };

  return (
    <div className="search-result" onClick={handleSearchChange}>
      <div className="search-content">
        <p>
          {rowData.Ticket} - {rowData.Board}
        </p>
        <p>{rowData.organName}</p>
      </div>
    </div>
  );
};
