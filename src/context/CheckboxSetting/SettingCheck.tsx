import React, { useState } from "react";
import Content from "./Content";
import Modal from "./Modal";
import { CheckboxProvider, useCheckbox } from "./index";

const SettingCheck: React.FC = () => {
  const { checked } = useCheckbox();

  const checkboxes = [
    { label: "Checkbox 1", id: "0" },
    { label: "Checkbox 2", id: "1" },
  ];

  return (
    <CheckboxProvider>
      <Content />
      <Modal onSave={handleSave} checkboxes={checkboxes} />
      <div style={{ display: checked ? "block" : "none" }}>Tôi yêu em</div>
      <div style={{ display: !checked ? "block" : "none" }}>
        Tôi không yêu em
      </div>
      <div>
        <h2>Other Content</h2>
        <p>This is some other content in your application.</p>
      </div>
    </CheckboxProvider>
  );
};

export default SettingCheck;
