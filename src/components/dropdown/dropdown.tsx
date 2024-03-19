import React from "react";
import "./dropdown.css";
import { Link } from "react-router-dom";
import { IDropdownItem } from "~/pages";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { rem } from "@mantine/core";
import { FavoriteItem } from "~/pages/components/NavSort/Navsort";

interface DropdownProps {
  children?: React.ReactNode;
  link?: string;
  lable?: string;
  classNames?: string;
  isHorvers?: boolean;
  items: IDropdownItem[] | FavoriteItem[];
}

const DropDown: React.FC<DropdownProps> = (props) => {
  const { children, items } = props;

  return (
    <div className="dropdown">
      <button className="dropbtn">
        {children}

        <IconCaretDownFilled
          style={{ width: rem(13), height: rem(13), color: "white" }}
        />
      </button>
      <div className="dropdown-content">
        {items.map((a) => {
          return (
            <li key={a.value}>
              <Link to={a.link}>{a.label}</Link>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default DropDown;
