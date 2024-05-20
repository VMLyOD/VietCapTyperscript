import React from "react";
import IconsPublic from "../../../components/icon/IconPublic";
import { MySetting } from "./SettingRight";
import { useCollapse } from "~/context/CollapseContext";
import { ButtonScroll } from "~/components/ButtonScroll/ButtonScroll";

interface HeadSortRightProps {
  handleTogglePlay: () => void;
  isPlaying: boolean;
}

export const HeadSortRight: React.FC<HeadSortRightProps> = () => {
  const { isButtonCollapseOpen, toggleCollapse } = useCollapse();

  return (
    <>
      <div
        style={{ background: "var(--mantine-color-transparent_20-filled)" }}
        className="rounded flex items-center"
      >
        <ButtonScroll />
      </div>

      <div
        style={{
          background: "var(--mantine-color-transparent_20-filled)",
          height: "24px",
          width: "24px",
        }}
        className="rounded flex items-center"
      >
        <MySetting />
      </div>

      <div
        style={{ background: "var(--mantine-color-transparent_20-filled)" }}
        className="rounded flex items-center"
      >
        <IconsPublic
          toolTip="Hidden"
          imageUrl={`/assets/icon/dark/icon-${isButtonCollapseOpen ? "up" : "down"}.svg`}
          onClick={toggleCollapse}
        />
      </div>
    </>
  );
};
