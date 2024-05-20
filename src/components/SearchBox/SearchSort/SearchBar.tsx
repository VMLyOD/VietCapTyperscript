// import React, { useState, ChangeEvent } from "react";
// import { FaSearch } from "react-icons/fa";

// import "./SearchBar.css";
// import SearchImg from "../SearchImg";

// interface SearchBarProps {
//   setResults: React.Dispatch<React.SetStateAction<any[]>>;
// }

// export const SearchBar: React.FC<SearchBarProps> = ({ setResults }) => {
//   const [input, setInput] = useState<string>("");

//   const fetchData = (value: string) => {
//     fetch("https://mt-qc.vietcap.int/api/price/symbols/getAll", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((json) => {
//         const results = json.filter(
//           (item: any) =>
//             (item.symbol &&
//               item.symbol.toLowerCase().includes(value.toLowerCase())) ||
//             (item.board &&
//               item.board.toLowerCase().includes(value.toLowerCase())) ||
//             (item.organName &&
//               item.organName.toLowerCase().includes(value.toLowerCase())) ||
//             (item.enOrganName &&
//               item.enOrganName.toLowerCase().includes(value.toLowerCase()))
//         );
//         setResults(results);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setResults([]);
//       });
//   };

//   const handleChange = (value: string) => {
//     setInput(value);
//     fetchData(value);
//   };

//   return (
//     <div className="input-wrapper">
//       <input
//         placeholder="search..."
//         value={input}
//         onChange={(e: ChangeEvent<HTMLInputElement>) =>
//           handleChange(e.target.value)
//         }
//       />
//       <SearchImg />
//     </div>
//   );
// };

import React, { useState, ChangeEvent, useEffect } from "react";
import { debounce } from "lodash";

import "./SearchBar.css";
import SearchImg from "../SearchImg";

interface SearchBarProps {
  setResults: React.Dispatch<React.SetStateAction<any[]>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setResults }) => {
  const [input, setInput] = useState<string>("");

  const fetchData = debounce((value: string) => {
    fetch("https://mt-qc.vietcap.int/api/price/symbols/getAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((item: any) =>
          item.symbol.toLowerCase().includes(value.toLowerCase())
        );
        // Các điều kiện lọc khác giữ nguyên
        setResults(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setResults([]);
      });
  }, 30000); // Debounce API call with 300ms delay

  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
  };

  useEffect(() => {
    return () => {
      fetchData.cancel(); // Hủy bỏ các API call chưa hoàn thành khi component unmounted
    };
  }, []);

  return (
    <div className="input-wrapper">
      <input
        placeholder="search..."
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value)
        }
      />
      <SearchImg />
    </div>
  );
};
