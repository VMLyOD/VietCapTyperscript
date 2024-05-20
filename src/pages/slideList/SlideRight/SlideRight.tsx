import React, { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import { useTranslation } from "react-i18next";
import {
  TestSlideAS,
  TestSlideCM,
  TestSlideEU,
  TestSlideOT,
  TestSlideUS,
} from "./TabSlideRight/TestSlide";
import { HeadlessMantineProvider } from "@mantine/core";
import classes from "./Demo.module.css";

const SlideRight: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="slide-lage-right m-1 w-[100%] rounded">
      <div className="slide-top-right">
        <ul className="tab-list-slide flex justify-between w-[100%]">
          <Tabs
            classNames={classes}
            style={{
              color: "var(--mantine-color-gray_80-filled)",
              flexWrap: "nowrap",
            }}
            defaultValue="US"
            h={"100%"}
            w={"100%"}
          >
            <Tabs.List display={"flex"} w={"100%"} justify="space-between">
              <Tabs.Tab pl={4} pr={4} value="US">
                {t("US")}
              </Tabs.Tab>
              <Tabs.Tab pl={4} pr={4} value="Europe">
                {t("Europe")}
              </Tabs.Tab>
              <Tabs.Tab pl={4} pr={4} value="Asia">
                {t("Asia")}
              </Tabs.Tab>
              <Tabs.Tab pl={4} pr={4} value="commodities">
                {t("Commodities")}
              </Tabs.Tab>
              <Tabs.Tab pl={4} pr={4} value="Other">
                {t("Other")}
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="US" w={"auto"}>
              <TestSlideUS />
            </Tabs.Panel>
            <Tabs.Panel value="Europe">
              <TestSlideEU />
            </Tabs.Panel>
            <Tabs.Panel value="Asia">
              <TestSlideAS />
            </Tabs.Panel>
            <Tabs.Panel value="commodities">
              <TestSlideCM />
            </Tabs.Panel>
            <Tabs.Panel value="Other">
              <TestSlideOT />
            </Tabs.Panel>
          </Tabs>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(SlideRight);
