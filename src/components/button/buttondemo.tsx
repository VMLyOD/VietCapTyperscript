import { buildClassName } from "~/shares/utils";
import "./styles.css";

interface ButtonDemoProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  justify?: React.CSSProperties;
  color?: "red" | "green" | "blue" | "none";
  className?: string;
  isOutline?: boolean;
  fontSize?: "10" | "12" | "14";
  textColor?: "gray" | "green" | "white";
}

const ButtonDemo: React.FC<ButtonDemoProps> = (props) => {
  const { className, children, color, size, isOutline, fontSize, textColor } =
    props;
  const buildClass = buildClassName(
    className,
    isOutline ? "is-outline" : "",
    color,
    size,
    textColor,
    fontSize
  );
  return <button className={buildClass}>{children}</button>;
};

export default ButtonDemo;
