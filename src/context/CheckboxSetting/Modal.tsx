// Modal.tsx
import React, { useState } from "react";
import { useCheckbox } from "./index";

interface Checkbox {
  label: string;
  id: string;
}

interface ModalProps {
  onSave: (checkedStates: boolean[]) => void;
  checkboxes: Checkbox[];
}

const Modal: React.FC<ModalProps> = ({ onSave, checkboxes }) => {
  const { isVisible, toggleVisibility } = useCheckbox();
  const [tempChecked, setTempChecked] = useState<boolean[]>(
    checkboxes.map(() => false)
  );

  const handleCheckboxChange = (index: number) => {
    const updatedChecked = [...tempChecked];
    updatedChecked[index] = !updatedChecked[index];
    setTempChecked(updatedChecked);
  };

  const handleSave = () => {
    const checkedStates = tempChecked;
    onSave(checkedStates);
    closeModal();
  };

  const closeModal = () => {
    toggleVisibility(); // Đóng modal
  };

  return (
    <>
      {isVisible && (
        <div className="modal">
          <h2>Settings</h2>
          {checkboxes.map((checkbox, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={tempChecked[index]}
                onChange={() => handleCheckboxChange(index)}
              />
              {checkbox.label}
            </label>
          ))}
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </>
  );
};

export default Modal;
