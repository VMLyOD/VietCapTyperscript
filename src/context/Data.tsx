import React, { createContext, useContext, useState } from "react";

const MyContext = createContext(undefined);

interface DataSlide {
  children: any;
  newData: any;
}
export const MyProvider: React.FC<DataSlide> = ({ children }) => {
  const [data, setData] = useState([]);

  const updateData = (newData: any) => {
    setData(newData);
  };

  return (
    <MyContext.Provider value={{ data, updateData }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyData = () => useContext(MyContext);
