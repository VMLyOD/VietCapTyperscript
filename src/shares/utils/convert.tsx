export const ConvertRef = (symbol: string, dataAPI: any) => {
  if (symbol === "VNINDEX") {
    return dataAPI[0]?.refPrice;
  } else if (symbol === "VN30") {
    return dataAPI[1]?.refPrice;
  } else if (symbol === "HNXIndex") {
    return dataAPI[2]?.refPrice;
  } else if (symbol === "HNX30") {
    return dataAPI[3]?.refPrice;
  } else {
    return dataAPI[4]?.refPrice;
  }
};
