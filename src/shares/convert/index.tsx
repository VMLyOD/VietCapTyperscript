export const convertDataSlide = (data: any) => {
  if (data.symbol === "HNXUpcomIndex") {
    return data;
  } else if (data.symbol === "VNINDEX") {
    return "VN";
  } else if (data.symbol === "HNXIndex") {
    return "HNX";
  } else {
    return data;
  }
};
