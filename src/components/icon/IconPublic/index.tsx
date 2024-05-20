// Icon.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import "../IconStyle.css";

interface IconProps {
  toolTip?: string;
  imageUrl?: string;
  linkTo?: string;
  nameTitle?: string;
  isActive?: boolean;
  onClick?: () => void;
  onMouseOut?: () => void;
  className?: string;
}

const IconsPublic: React.FC<IconProps> = ({
  toolTip = "",
  imageUrl = "",
  linkTo = "#",
  nameTitle = "",
  isActive,
  onClick,
}) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={toolTip} placement="top">
      <div className="icon-bruh">
        <Link to={linkTo}>
          <button className="custom-img" onClick={onClick}>
            <span className="tooltiptext">{nameTitle}</span>
            <img src={imageUrl} alt="" className="custom-img" />
          </button>
        </Link>
      </div>
    </Tooltip>
  );
};

export default IconsPublic;
