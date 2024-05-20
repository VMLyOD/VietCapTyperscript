import React, { useState } from "react";
import "./dropdown.css";
import { Link } from "react-router-dom";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { rem } from "@mantine/core";
import { FavoriteItem } from "~/pages/components/NavSort/Navsort";
import { ToolItem } from "~/pages/components/header/Navigation/Navigation";
import { ArrayItem } from "~/shares/utils/Array";
import { useTranslation } from "react-i18next";

interface DropdownProps {
  children?: React.ReactNode;
  link?: string;
  label?: string;
  classNames?: string;
  isHover?: boolean;
  items?: FavoriteItem[] | ToolItem[] | ArrayItem[];
  isUppercase?: boolean;
  Value?: String;
  textGroup?: string;
  handleFilterChange?: (filter: string) => void;
  onClick?: () => void;
}

const DropDown: React.FC<DropdownProps> = (props) => {
  const { children, items } = props;
  const { t } = useTranslation();

  return (
    <div className="dropdown">
      <button className="dropbtn">{children}</button>
      <div className="dropdown-content">
        {items.map((a) => {
          return (
            <li key={a.value}>
              <Link to={a.link}>{t(a.label)}</Link>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default DropDown;
