import React, { useState, useContext, createContext, ReactNode } from "react";

type CollapseContextType = {
  toggleCollapse: () => void;
};

const CollapseContext = createContext<CollapseContextType | any>(undefined);

type CollapseProviderProps = {
  children: ReactNode;
};

export const CollapseProvider: React.FC<CollapseProviderProps> = ({
  children,
}) => {
  const [isButtonCollapseOpen, setIsButtonCollapseOpen] = useState(true);

  const toggleCollapse = () => {
    setIsButtonCollapseOpen((prevState) => !prevState);
  };

  return (
    <CollapseContext.Provider value={{ isButtonCollapseOpen, toggleCollapse }}>
      {children}
    </CollapseContext.Provider>
  );
};

export const useCollapse = () => {
  return useContext(CollapseContext);
};
