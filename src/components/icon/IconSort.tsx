import "./IconStyle.css";

import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import IconsPublic from "./IconPublic";

const IconSort: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="icon-container h-7 w-20 rounded-[4px] flex items-center justify-center">
        <IconsPublic toolTip="Ôi bạn ơi" imageUrl="/assets/sort-1.svg" />
        <IconsPublic
          toolTip="Chưa chơi đồ đấy bạn ạ"
          imageUrl="/assets/sort-2.svg"
        />
        <IconsPublic toolTip="Ảo thật đấy" imageUrl="/assets/sort-3.svg" />
      </div>
    </>
  );
};

export default IconSort;
