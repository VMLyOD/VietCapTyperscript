import React from "react";
import { useCheckbox } from "./index";

const Content: React.FC = () => {
  const { toggleVisibility } = useCheckbox();

  return (
    <div>
      <button onClick={toggleVisibility}>Open Settings</button>
    </div>
  );
};

export default Content;
