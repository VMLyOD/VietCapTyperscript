// // SearchResultsList.tsx

// import React from "react";
// import "./SearchResultsList.css";
// import { SearchResult } from "./SearchResult";

// interface SearchResultsListProps {
//   results: {
//     symbol: string;
//     board: string;
//     organName: string;
//     id: string;
//     organShortName: string;
//   }[];
// }

// export const SearchResultsList: React.FC<SearchResultsListProps> = ({
//   results,
// }) => {
//   return (
//     <div className="results-list">
//       {results.map((result, id) => {
//         return <SearchResult result={result} key={id}></SearchResult>;
//       })}
//     </div>
//   );
// };

import React from "react";
import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

interface SearchResultsListProps {
  // results: {
  //   symbol: string;
  //   board: string;
  //   organName: string;
  //   id: string;
  //   organShortName: string;
  // }[];

  results?: any[];
  gridApi?: any;
  rowData?: any[];
}

export const SearchResultsList: React.FC<SearchResultsListProps> = ({
  results,
  gridApi,
  rowData,

  handleSearchChange,
}) => {
  console.log(rowData);
  return (
    <div className="results-list">
      {rowData.map((result, index) => {
        return (
          <SearchResult
            result={result}
            key={result.id}
            handleSearchChange={handleSearchChange}
            gridApi={gridApi}
            rowData={rowData}
          />
        );
      })}
    </div>
  );
};
