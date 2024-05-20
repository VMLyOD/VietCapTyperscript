import React, { useState, useEffect } from "react";
import "./SlideStyle.css";

import { convertDataSlide } from "~/shares/convert";
import SlideRight from "./SlideRight/SlideRight";
import Modal from "~/components/modal";
import { SlideTopItem, convertSymbol } from "./SlideItem";
import { SlideCenterItem } from "./SlideItem/SlideCenter";
import { SlideBotItem, SlideBottom } from "./SlideItem/SlideBot";
import { fetchMarketIndexData } from "~/services/api/Index";
import Skeleton from "~/components/skeleton";

export interface DataItem {
  refPrice: number;
  symbol: string;
  board: string;
  price: number;
  // toFixed: any;
  changePercent: number;
  status: string;
  totalStockNoChange: number;
  totalStockFloor: number;
  totalStockDecline: number;
  totalStockCeiling: number;
  totalStockIncrease: number;
  totalValue: number;
  totalShares: number;
  change: number;
  isCheckboxCollapseOpen: any;
}

const SlideList: React.FC<{ data: DataItem | any }> = ({ data }) => {
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // // console.table(data);

  // const [data, setData] = useState([]);
  // // console.table(data);

  // useEffect(() => {
  //   fetchMarketIndexData(setData, setLoading, setError);
  // }, []);

  return (
    <div className="box-header flex w-[100%]  text-white mt-[3px]">
      {/* {data.map((item: DataItem | any, index: number) => ( */}
      <div className="slide-lager w-[100%] flex rounded">
        <div className="slide-medium color-custom lg:rounded w-[100%] lg:m-1">
          <div>
            <div className="flex">
              <div
                className="slide-top w-[100%] mx-4 mt-4"
                style={{ color: "var(--mantine-color-gray_80-filled)" }}
              >
                <SlideTopItem item={data} />
                <SlideCenterItem item={data} />
                <SlideBotItem item={data} />
              </div>
            </div>
            <Modal modalTitle={convertSymbol(data.symbol) + " - Index"}>
              <SlideBottom />
            </Modal>
          </div>
        </div>
      </div>

      <div className="h-[180px]">
        <SlideRight></SlideRight>
      </div>
    </div>
  );
};

export default SlideList;
