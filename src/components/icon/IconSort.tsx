import { ActionIcon, Group, Tabs, rem } from "@mantine/core";
import classes from "./Demo.module.css";
import {
  IconAdjustments,
  IconMessageCircle,
  IconPhoto,
  IconSettings,
} from "@tabler/icons-react";
import React from "react";

const IconSort: React.FC = () => {
  return (
    <Tabs
      className="icon-button"
      color="green"
      variant="pills"
      defaultValue="settings"
    >
      <Tabs.List>
        <Tabs.Tab
          style={{ width: "24px", height: "24px" }}
          value="settings"
          leftSection={
            <IconAdjustments style={{ width: "20px", height: "20px" }} />
          }
        ></Tabs.Tab>
        <Tabs.Tab
          style={{ width: "24px", height: "24px" }}
          value="messages"
          leftSection={
            <IconMessageCircle style={{ width: "20px", height: "20px" }} />
          }
        ></Tabs.Tab>
        <Tabs.Tab
          style={{ width: "24px", height: "24px" }}
          value="gallery"
          leftSection={<IconPhoto style={{ width: "20px", height: "20px" }} />}
        ></Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};

export default IconSort;
