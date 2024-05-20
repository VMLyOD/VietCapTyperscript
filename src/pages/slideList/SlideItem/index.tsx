// SlideItem.tsx
import React, { memo } from "react";
import IconsTrade from "~/components/icon/IconTrade/Index";
import {
  formatChange,
  formatChangePercent,
  formatPrice,
} from "~/shares/utils/formatterData";

export const convertSymbol = (symbol: string) => {
  if (symbol === "HNXUpcomIndex") {
    return "UPCOM";
  } else if (symbol === "VNINDEX") {
    return "VN";
  } else if (symbol === "HNXIndex") {
    return "HNX";
  } else {
    return symbol;
  }
};

export const convertPercent = (changePercent: any) => {
  if (changePercent == 0) {
    return changePercent;
  } else if (changePercent > 0) {
    return "+" + changePercent;
  } else {
    return changePercent;
  }
};

interface Props {
  item: any;
  RefPrice?: any;
}

export const SlideTopItem: React.FC<Props> = memo(({ item, RefPrice }) => {
  // console.log(RefPrice);
  return (
    <div className="slide-top-1 flex justify-between h-11 w-[100%]">
      <div className="slide-top-1-left h-[100%] flex">
        <SlideTopLeftIcon item={item} RefPrice={RefPrice} />
        <div className="ml-3 h-[44px] w-[auto]">
          <SlideTopLeftSymbols item={item} RefPrice={RefPrice} />
          <SlideTopLeftPrice item={item} RefPrice={RefPrice} />
        </div>
      </div>
      <div className="slide-top-1-right">
        <div>
          <SlideTopRightPrice item={item} RefPrice={RefPrice} />
          <SlideTopRightrefPrice item={item} RefPrice={RefPrice} />
        </div>
      </div>
    </div>
  );
});

export const SlideTopLeftIcon: React.FC<Props> = memo(({ item, RefPrice }) => {
  return (
    <div
      className={`rect-down flex w-10 h-10 lg:rounded items-center justify-center ${
        item.price > RefPrice
          ? "green-BG"
          : item.price === 0
            ? "yellow-BG"
            : item.price == RefPrice
              ? "yellow-BG"
              : "red-BG"
      }`}
    >
      <div className="items-center justify-center flex">
        {item.price === 0 && <IconsTrade urlImage="/assets/dash.svg" />}
        {item.price !== 0 && item.price < RefPrice && (
          <IconsTrade urlImage="/assets/down.svg" />
        )}
        {item.price !== 0 && item.price > RefPrice && (
          <IconsTrade urlImage="/assets/up.svg" />
        )}
        {item.price !== 0 && item.price === RefPrice && (
          <IconsTrade urlImage="/assets/dash.svg" />
        )}
      </div>
    </div>
  );
});

export const SlideTopLeftPrice: React.FC<Props> = ({ item, RefPrice }) => {
  // console.log("price", item.price);
  // console.log("RefPrice", RefPrice);

  return (
    <div className="info-index-point text-sm">
      <h3
        className={`item-title-slide ${
          item.price > RefPrice
            ? "green-color"
            : item.price === 0
              ? "yellow-color"
              : item.price == RefPrice
                ? "yellow-color"
                : "red-color"
        }`}
      >
        {item.price === 0 ? formatPrice(item.price) : formatPrice(RefPrice)}
      </h3>
    </div>
  );
};

export const SlideTopLeftSymbols: React.FC<Props> = ({ item }) => {
  return (
    <div className="info-index-name ">
      <h3 className="symbol-title">{convertSymbol(item.symbol)} - Index</h3>
    </div>
  );
};

export const SlideTopRightPrice: React.FC<Props> = ({ item, RefPrice }) => {
  const formattedChangePercent = formatChangePercent(item.changePercent);
  return (
    <div className="info-index-name">
      <h3
        className={`${
          item.price > RefPrice
            ? "green-color"
            : item.price === 0
              ? "yellow-color"
              : item.price == RefPrice
                ? "yellow-color"
                : "red-color"
        }`}
      >
        {formattedChangePercent}%
      </h3>
    </div>
  );
};

export const SlideTopRightrefPrice: React.FC<Props> = ({ item, RefPrice }) => {
  const formattedChange = formatChange(item.change);
  return (
    <div className="info-index-point">
      <h3
        className={`${
          item.price > RefPrice
            ? "green-color"
            : item.price === 0
              ? "yellow-color"
              : item.price == RefPrice
                ? "yellow-color"
                : "red-color"
        }`}
      >
        {formattedChange}
      </h3>
    </div>
  );
};
