import React from "react";
import Logo from "../../assets/Logo/logo.svg";

interface LogoProps {
  className?: string;
}

const VietCapLogo: React.FC<LogoProps> = (props) => {
  const { className } = props;
  return <img src={Logo} className={className} alt="logo" />;
};

export default VietCapLogo;
