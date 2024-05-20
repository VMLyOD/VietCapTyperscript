import React from "react";
import { handleFilterChange } from "../../Index";

interface TestProps {
  setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Test: React.FC<TestProps> = ({ setActiveFilter }) => {
  return (
    <>
      <button onClick={() => handleFilterChange("UPCOM", setActiveFilter)}>
        UPCOM
      </button>
    </>
  );
};

export default Test;
