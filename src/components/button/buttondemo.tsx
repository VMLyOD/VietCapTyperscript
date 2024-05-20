import { buildClassName } from "~/shares/utils";
import "./styles.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";

interface ButtonDemoProps {
  children: any;
  size?:
    | "btncpn-small"
    | "btncpn-medium"
    | "btncpn-large"
    | "btncpn-Vlarge"
    | "btncpn-120"
    | "btncpn-min";
  justify?: React.CSSProperties;
  color?:
    | "btncpn-red"
    | "btncpn-green"
    | "btncpn-blue"
    | "btncpn-none"
    | "btncpn-gray"
    | "btncpn-gray40";
  className?: string;
  isOutline?: boolean;
  fontSize?: "10" | "12" | "14";
  textColor?: "gray" | "green" | "white" | "gray" | "gray40";
  isUppercase?: boolean;
  to?: string;
  buttonType?: "button" | "link" | "router-link";
  onClick?: () => void;
}

const ButtonDemo: React.FC<ButtonDemoProps> = (props) => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const {
    className,
    children,
    color,
    size,
    isOutline,
    fontSize,
    textColor,
    isUppercase,
    buttonType,
    to,
    onClick,
  } = props;

  const handleButtonClick = () => {
    setIsActive(!isActive);
    if (onClick) {
      onClick();
    }
  };

  // const activeClass = isActive ? "active" : "";

  const buildClass = buildClassName(
    className,
    isOutline ? "is-outline" : "",
    isUppercase ? "is-uppercase" : "",
    color,
    size,
    textColor,
    fontSize,
    buttonType,
    to
    // activeClass
  );
  if (buttonType === "router-link" && to) {
    return (
      <Link to={to} className={buildClass}>
        {children}
      </Link>
    );
  } else if (buttonType === "link" && to) {
    return (
      <a
        href={to}
        className={buildClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  } else {
    return (
      <button onClick={handleButtonClick} className={buildClass}>
        {children}
      </button>
    );
  }
};

export default ButtonDemo;
