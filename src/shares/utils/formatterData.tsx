export const formatData = (data: any) => {
  const removeLastChar = (str: string) => str.slice(0, -1);
  const formatNumber = (num: number) => num.toLocaleString();

  const getPrice = (price: number | undefined) =>
    price === undefined || price === 0
      ? ""
      : removeLastChar(formatNumber(price));

  const getVolume = (volume: number | undefined) =>
    volume === undefined || volume === 0 ? "" : formatNumber(volume);

  const MatPs = data.MatPx + "%";

  return data.map((item: any, index: any) => {
    const {
      listingInfo,
      matchPrice,
      bidAsk,
      foreignBuyVolume,
      foreignSellVolume,
    } = item;

    return {
      key: index,
      Ticket: listingInfo.symbol,
      Ceil: getPrice(listingInfo.ceiling),
      Ref: getPrice(listingInfo.refPrice),
      Floor: getPrice(listingInfo.floor),
      MatPrice: getPrice(matchPrice.matchPrice),
      MatVol: getVolume(matchPrice.matchVol),
      MatTVol: getVolume(matchPrice.accumulatedVolume),
      AskPrice1: getPrice(bidAsk.askPrices[0]?.price),
      AskVol1: getVolume(bidAsk.askPrices[0]?.volume),
      AskPrice2: getPrice(bidAsk.askPrices[1]?.price),
      AskVol2: getVolume(bidAsk.askPrices[1]?.volume),
      AskPrice3: getPrice(bidAsk.askPrices[2]?.price),
      AskVol3: getVolume(bidAsk.askPrices[2]?.volume),
      BidPrice1: getPrice(bidAsk.bidPrices[0]?.price),
      BidVol1: getVolume(bidAsk.bidPrices[0]?.volume),
      BidPrice2: getPrice(bidAsk.bidPrices[1]?.price),
      BidVol2: getVolume(bidAsk.bidPrices[1]?.volume),
      BidPrice3: getPrice(bidAsk.bidPrices[2]?.price),
      BidVol3: getVolume(bidAsk.bidPrices[2]?.volume),
      organName: listingInfo.organName,
      Board: listingInfo.board,

      MatPx:
        item.matchPrice.matchPrice !== undefined &&
        item.matchPrice.matchPrice !== 0 &&
        item.listingInfo.refPrice !== undefined &&
        item.listingInfo.refPrice !== 0
          ? ((item.matchPrice.matchPrice - item.listingInfo.refPrice) /
              item.listingInfo.refPrice) *
              100 ===
            0
            ? ""
            : (
                ((item.matchPrice.matchPrice - item.listingInfo.refPrice) /
                  item.listingInfo.refPrice) *
                100
              ).toFixed(2)
          : "",
      High: getPrice(matchPrice.highest),
      Avg: formatNumber(matchPrice.avgMatchPrice).slice(0, -4) || "",
      Low: getPrice(matchPrice.lowest),
      Bought: matchPrice.foreignBuyVolume,
      Sold: matchPrice.foreignSellVolume,
      MatPss: MatPs,
    };
  });
};

export const formatPrice = (price: number): string => {
  if (price === undefined) return "";
  return price.toFixed(2);
};

export const formatChange = (change: number): string => {
  return Math.abs(change).toFixed(2);
};

export const formatChangePercent = (changePercent: number): string => {
  return Math.abs(changePercent).toFixed(2);
};

export const formatNumber = (number?: number): string => {
  if (number === undefined) return "";
  return number.toLocaleString();
};

// export const formatData = (data: any) => {
//   const removeLastChar = (str: string) => str.slice(0, -1);
//   const formatNumber = (num: number) => num.toLocaleString();

//   const getPrice = (price: number | undefined) =>
//     price === undefined || price === 0
//       ? ""
//       : removeLastChar(formatNumber(price));

//   const getVolume = (volume: number | undefined) =>
//     volume === undefined || volume === 0 ? "" : formatNumber(volume);

//   const formatPriceAndVolume = (prices: any[]) => {
//     if (prices && prices.length > 0) {
//       const price = getPrice(prices[0]?.price);
//       const volume = getVolume(prices[0]?.volume);
//       return { price, volume };
//     } else {
//       return { price: "", volume: "" };
//     }
//   };

//   return data.map((item: any, index: any) => {
//     const {
//       listingInfo,
//       matchPrice,
//       bidAsk,
//       foreignBuyVolume,
//       foreignSellVolume,
//     } = item;

//     const { bidPrices, askPrices } = bidAsk;

//     const { price: askPrice1, volume: askVol1 } =
//       formatPriceAndVolume(askPrices);
//     const { price: askPrice2, volume: askVol2 } = formatPriceAndVolume(
//       askPrices.slice(1)
//     );
//     const { price: askPrice3, volume: askVol3 } = formatPriceAndVolume(
//       askPrices.slice(2)
//     );
//     const { price: bidPrice1, volume: bidVol1 } =
//       formatPriceAndVolume(bidPrices);
//     const { price: bidPrice2, volume: bidVol2 } = formatPriceAndVolume(
//       bidPrices.slice(1)
//     );
//     const { price: bidPrice3, volume: bidVol3 } = formatPriceAndVolume(
//       bidPrices.slice(2)
//     );

//     return {
//       key: index,
//       Ticket: listingInfo.symbol,
//       Ceil: getPrice(listingInfo.ceiling),
//       Ref: getPrice(listingInfo.refPrice),
//       Floor: getPrice(listingInfo.floor),
//       MatPrice: getPrice(matchPrice.matchPrice),
//       MatVol: getVolume(matchPrice.matchVol),
//       MatTVol: getVolume(matchPrice.accumulatedVolume),
//       AskPrice1: askPrice1,
//       AskVol1: askVol1,
//       AskPrice2: askPrice2,
//       AskVol2: askVol2,
//       AskPrice3: askPrice3,
//       AskVol3: askVol3,
//       BidPrice1: bidPrice1,
//       BidVol1: bidVol1,
//       BidPrice2: bidPrice2,
//       BidVol2: bidVol2,
//       BidPrice3: bidPrice3,
//       BidVol3: bidVol3,
//       MatPx:
//         matchPrice.matchPrice !== undefined &&
//         matchPrice.matchPrice !== 0 &&
//         listingInfo.refPrice !== undefined &&
//         listingInfo.refPrice !== 0
//           ? (
//               ((matchPrice.matchPrice - listingInfo.refPrice) /
//                 listingInfo.refPrice) *
//               100
//             ).toFixed(2)
//           : "",
//       High: getPrice(matchPrice.highest),
//       Avg: formatNumber(matchPrice.avgMatchPrice).slice(0, -4) || "",
//       Low: getPrice(matchPrice.lowest),
//       Bought: getVolume(foreignBuyVolume),
//       Sold: getVolume(foreignSellVolume),
//       MatPss: `${matchPrice.matchPrice}%`,
//     };
//   });
// };

// export const formatPrice = (price: number): string => {
//   if (price === undefined) return "";
//   return price.toFixed(2);
// };

// export const formatChange = (change: number): string => {
//   return Math.abs(change).toFixed(2);
// };

// export const formatChangePercent = (changePercent: number): string => {
//   return Math.abs(changePercent).toFixed(2);
// };

// export const formatNumber = (number?: number): string => {
//   if (number === undefined) return "";
//   return number.toLocaleString();
// };
