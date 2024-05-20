import React from "react";
import { useCheckbox } from "./index";

const HiddenContent: React.FC = () => {
  const { checked } = useCheckbox(); // Sử dụng checked từ Context để kiểm tra trạng thái

  return checked ? (
    <p>This content is hidden or shown based on checkbox state.</p>
  ) : null;
};

export default HiddenContent;
