import Modal from "~/components/modal";
import React, { useCallback, useEffect, useState } from "react";
import { SlideTopItem, convertSymbol } from "./SlideItem";
import { SlideBotItem, SlideBottom } from "./SlideItem/SlideBot";
import { SlideCenterItem } from "./SlideItem/SlideCenter";
import { DataItem } from "./SlideListTrade";
import SlideRight from "./SlideRight/SlideRight";
import "./SlideStyle.css";
import { fetchMarketIndexData, fetchSlideList } from "~/services/api/Index";
import { ConvertRef } from "~/shares/utils/convert";
declare module "react-collapse";
import { Collapse } from "react-collapse";
import IconsPublic from "~/components/icon/IconPublic";
import { useCollapse } from "~/context/CollapseContext";

const SlideListNew: React.FC<{ data: DataItem | any }> = ({ data }) => {
  const [dataItems, setDataItems] = useState([]);
  const [dataAPI, setData] = useState<DataItem | any>([]);
  const { isButtonCollapseOpen, toggleCollapse } = useCollapse();

  useEffect(() => {
    fetchMarketIndexData(setData);
  }, []);

  // useEffect(() => {
  //   const updateDataItems = (newData: DataItem[] | any) => {
  //     const newDataItems: any = {};
  //     newData.forEach((item: DataItem) => {
  //       newDataItems[item.symbol] = item;
  //     });
  //     setDataItems(newDataItems);
  //   };
  //   updateDataItems(data);
  // }, [data]);

  useEffect(() => {
    fetchMarketIndexData(setDataItems);
    fetchSlideList()
      .then((data) => setDataItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const updateDataItems = (newData: DataItem[] | any) => {
      if (newData && Array.isArray(newData)) {
        const newDataItems: { [key: string]: DataItem } = {};
        newData.forEach((item: DataItem) => {
          newDataItems[item.symbol] = item;
        });
        setDataItems(newDataItems);
      } else {
        console.error("Invalid data format:", newData);
      }
    };
    updateDataItems(data);
  }, [data]);

  return (
    <Collapse isOpened={isButtonCollapseOpen} className="slide-listtrade">
      <div className=" flex w-[100%] text-white mt-[3px]">
        {Object.values(dataItems).map((item: any, index) => {
          return (
            <div
              id={item.symbol}
              key={index}
              className="slide-lager w-[100%] flex rounded"
            >
              <div className="slide-medium color-custom lg:rounded w-[100%] lg:m-1">
                <div>
                  <div className="flex">
                    <div
                      className="slide-top w-[100%] mx-4 mt-4"
                      style={{ color: "var(--mantine-color-gray_80-filled)" }}
                    >
                      <SlideTopItem
                        item={item}
                        // RefPrice={refPrice ? refPrice : "N/A"}
                        RefPrice={ConvertRef(item.symbol, dataAPI)}
                      />

                      <SlideCenterItem item={item} />
                      <SlideBotItem item={item} />
                    </div>
                  </div>
                  <Modal modalTitle={convertSymbol(item.symbol) + " - Index"}>
                    <SlideBottom />
                  </Modal>
                </div>
              </div>
            </div>
          );
        })}
        <SlideRight></SlideRight>
      </div>
    </Collapse>
  );
};

export default React.memo(SlideListNew);
