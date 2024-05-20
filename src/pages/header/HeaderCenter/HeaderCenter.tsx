import React from "react";
import { useCheckbox } from "~/context/CheckboxSetting";

export const CheckboxComponent = () => {
  const { isChecked, toggleCheckbox, isDisplayed, toggleDisplay } =
    useCheckbox();

  return (
    <div>
      {isDisplayed && (
        <div>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={toggleCheckbox}
          />
          <label>Checkbox</label>
        </div>
      )}
      <button onClick={toggleDisplay}>
        {isDisplayed ? "Hide Checkbox" : "Show Checkbox"}
      </button>
    </div>
  );
};
