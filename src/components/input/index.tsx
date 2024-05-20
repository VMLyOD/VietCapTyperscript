import { dropClassName } from "~/shares/utils";
import "./style.css";
import { ChangeEventHandler } from "react";

interface InputComponentProps {
  placeholder?: string;
  id?: string;
  nameInput?: string;
  type?: "text" | "password" | "number";
  value?: string;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "danger" | "inp-nomal";
  fontSize?: "inp-12" | "inp-14" | "inp-20";
  onChange?: ChangeEventHandler<T> | undefined;
}

export const InputComponent: React.FC<InputComponentProps> = ({
  placeholder,
  id,
  nameInput,
  type,
  value,
  size,
  color,
  fontSize,
  onChange,
}) => {
  const buildClass = dropClassName(size, color, fontSize);
  return (
    <input
      className={buildClass}
      placeholder={placeholder}
      id={id}
      name={nameInput}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};
