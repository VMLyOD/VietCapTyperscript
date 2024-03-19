import React from "react";
import UP from "../../assets/Images/up.svg";

interface IconProps {
  className: string;
  src: number;
}

const IconRectUP: React.FC<IconProps> = () => {
  return <img src={UP} className="img-icon"></img>;
};

export default IconRectUP;
