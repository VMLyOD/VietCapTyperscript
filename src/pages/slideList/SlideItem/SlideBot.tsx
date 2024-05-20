import { memo } from "react";
import { DataItem } from "../SlideListTrade";
import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconPointFilled,
  IconSquareFilled,
} from "@tabler/icons-react";

interface Props {
  item: DataItem | any;
}

export const SlideBotItem: React.FC<Props> = ({ item }) => {
  return (
    <div className="slide-top-3 flex justify-between">
      <SlideBotItemLeft item={item} />
      <SlideBotItemRight />
    </div>
  );
};

export const SlideBotItemLeft: React.FC<Props> = memo(({ item }) => {
  return (
    <div className="slide-top-3-1  items-center flex">
      <h3 className="data-custom-1 flex items-center text-green-600">
        <IconCaretUpFilled
          className="mr-1"
          style={{ width: "15px", height: "15px" }}
        />
        {item.totalStockIncrease}
        <span className="text-purple-600">({item.totalStockCeiling})</span>
      </h3>
      <h3 className="data-custom-2 flex items-center text-yellow-500">
        <IconSquareFilled
          className="m-[4px]"
          style={{ width: "8px", height: "8px" }}
        />
        {item.totalStockNoChange}
      </h3>
      <h3 className="data-custom-3 flex items-center text-red-500">
        <IconCaretDownFilled
          className="m-[2px]"
          style={{ width: "15px", height: "15px" }}
        />
        {item.totalStockDecline}
        <span className="text-blue-500">({item.totalStockFloor})</span>
      </h3>
    </div>
  );
});

export const SlideBotItemRight: React.FC = () => {
  return (
    <div
      className="box-status  w-[59px] h-[18px] lg:rounded-sm"
      style={{ background: "var(--mantine-color-gray_10-filled)" }}
    >
      <span className="dot-custom-status flex items-center justify-start">
        <IconPointFilled style={{ width: "15px", height: "15px" }} />
        Status
      </span>
    </div>
  );
};

export const SlideBottom: React.FC = () => {
  return (
    <div className="slide-bottom w-[100%]">
      <div className="slide-bottom-2 h-[58px] lg:rounded-sm "></div>
    </div>
  );
};
