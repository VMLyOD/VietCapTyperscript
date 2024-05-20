import React, { useState, useContext, ReactNode } from "react";

interface CheckboxContextData {
  isVisible: boolean;
  toggleVisibility: () => void;
  saveChanges: () => void;
  checked: boolean; // Thêm checked vào CheckboxContextData
}

interface CheckboxProp {
  children: ReactNode;
}

const CheckboxContext = React.createContext<CheckboxContextData | undefined>(
  undefined
);

export const CheckboxProvider: React.FC<CheckboxProp> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tempChecked, setTempChecked] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  const saveChanges = () => {
    setChecked(tempChecked);
    setIsVisible(false);
  };

  return (
    <CheckboxContext.Provider
      value={{ isVisible, toggleVisibility, saveChanges, checked }}
    >
      {children}
    </CheckboxContext.Provider>
  );
};

export const useCheckbox = () => {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error("useCheckbox must be used within a CheckboxProvider");
  }
  return context;
};
