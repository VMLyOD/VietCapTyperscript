export enum CellClassName {
  CEIL = "ceil",
  FLOOR = "floor",
  REF = "ref",
  UP = "up",
  DOWN = "down",
}

export enum Session {
  ATO = -1,
  ATC = -2,
}

export const valueClassRules = {
  [CellClassName.CEIL]: "value === data?.ceilingPrice",
  [CellClassName.FLOOR]: "value === data?.floorPrice",
  [CellClassName.REF]:
    "value === data?.referencePrice || [-1, -2].includes(value)",
  [CellClassName.UP]:
    "value !== data?.ceilingPrice && value !== data?.floorPrice && value > data?.referencePrice",
  [CellClassName.DOWN]:
    "value !== data?.ceilingPrice && value !== data?.floorPrice && value < data?.referencePrice",
};

export const bidClassRules = (index: number) => {
  const price = `data?.bidOfferList?.[${index}]?.bidPrice`;

  const vol = `data?.bidOfferList?.[${index}]?.bidVolume`;

  return {
    [CellClassName.CEIL]: `${price} === data?.ceilingPrice`,
    [CellClassName.FLOOR]: `${price} === data?.floorPrice`,
    [CellClassName.REF]: `${price} === -1 || ${price} === -2 || ${price} === data?.referencePrice`,
    [CellClassName.UP]: `${price} !== data?.ceilingPrice && ${price} !== data?.floorPrice && ${price} > data?.referencePrice`,
    [CellClassName.DOWN]: `${price} !== data?.ceilingPrice && ${price} !== data?.floorPrice && ${price} < data?.referencePrice`,
  };
};

export const offerClassRules = (index: number) => {
  const price = `data?.bidOfferList?.[${index}]?.offerPrice`;

  const vol = `data?.bidOfferList?.[${index}]?.offerVolume`;

  return {
    [CellClassName.CEIL]: `${price} === data?.ceilingPrice`,
    [CellClassName.FLOOR]: `${price} === data?.floorPrice`,
    [CellClassName.REF]: `${price} === -1 || ${price} === -2 || ${price} === data?.referencePrice`,
    [CellClassName.UP]: `${price} !== data?.ceilingPrice && ${price} !== data?.floorPrice && ${price} > data?.referencePrice`,
    [CellClassName.DOWN]: `${price} !== data?.ceilingPrice && ${price} !== data?.floorPrice && ${price} < data?.referencePrice`,
  };
};

export const basisClassRules = {
  [CellClassName.UP]: "data.basis > 0",
  [CellClassName.DOWN]: "data.basis < 0",
  [CellClassName.REF]:
    "data.basis === 0 || !data.basis || data.symbol.includes('GB')",
};

export const matchClassRules = () => {
  const value =
    '(["ATO", "ATC"].includes(data.session) ? data?.expectedPrice : data?.matchingPrice)';
  return {
    [CellClassName.CEIL]: `!!${value} && ${value} === data?.ceilingPrice`,
    [CellClassName.FLOOR]: `!!${value} && ${value} === data?.floorPrice`,
    [CellClassName.REF]: `!${value} || ${value} === data?.referencePrice`,
    [CellClassName.UP]: `${value} !== data?.ceilingPrice && ${value} !== data?.floorPrice && ${value} > data?.referencePrice`,
    [CellClassName.DOWN]: `${value} !== data?.ceilingPrice && ${value} !== data?.floorPrice && ${value} < data?.referencePrice`,
  };
};

export const matchClassRulesBidAsk = () => {
  // const value = '(["ATO", "ATC"].includes(data.session) ? data?.expectedPrice : data?.matchingPrice)';
  const value = "data?.ptMatchPrice";

  return {
    [CellClassName.CEIL]: `${value} === data?.ceilingPrice`,
    [CellClassName.FLOOR]: `${value} === data?.floorPrice`,
    [CellClassName.REF]: `!${value} || ${value} === data?.referencePrice`,
    [CellClassName.UP]: `${value} !== data?.ceilingPrice && ${value} > data?.referencePrice`,
    [CellClassName.DOWN]: `${value} !== data?.floorPrice && ${value} < data?.referencePrice`,
  };
};

export const getPriceColor = (price: number, priceInfo: any) => {
  if (Number(price) == Number(priceInfo.ceilingPrice))
    return CellClassName.CEIL;
  if (Number(price) == Number(priceInfo.floorPrice)) return CellClassName.FLOOR;
  if (Number(price) > Number(priceInfo.referencePrice)) return CellClassName.UP;
  if (Number(price) < Number(priceInfo.referencePrice))
    return CellClassName.DOWN;
  return CellClassName.REF;
};

export function formatNumber(
  value: any,
  digit: any,
  offsetRate: any,
  toFixed: any,
  failureValue: any
) {
  if (value == null || Number.isNaN(value)) {
    return failureValue;
  }

  let data = value;

  if (offsetRate != null) {
    data = value / offsetRate;
  }

  let tempValueString = data.toString();

  let prefix = "";

  if (tempValueString[0] === "-") {
    prefix = "-";
    tempValueString = tempValueString.substring(1, tempValueString.length);
  }

  try {
    const tempValue = Number(tempValueString);

    let fractionDigit = 0;

    if (digit != null) {
      fractionDigit = digit;
    }

    if (fractionDigit > 0) {
      const temp =
        +`${Math.round(Number(`${Number(tempValue.toString())}e+${fractionDigit}`))}e-${fractionDigit}`;

      let fractionString = "";

      let i = "";

      if (toFixed === true) {
        i = temp.toFixed(fractionDigit);
        fractionString = i.substring(i.indexOf("."), i.length);
        i = i.substring(0, i.indexOf("."));
      } else {
        i = temp.toString();

        if (temp.toString().indexOf(".") > 1) {
          fractionString = temp
            .toString()
            .substring(temp.toString().indexOf("."), temp.toString().length);
          i = temp.toString().substring(0, temp.toString().indexOf("."));
        }
      }

      return prefix + i.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + fractionString;
    }

    const temp =
      +`${Math.round(Number(`${Number(tempValue.toString())}e+${fractionDigit}`))}e-${fractionDigit}`;

    const i = temp.toString();

    return prefix + i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } catch {
    return "";
  }
}

export const matchRateFormatter = (params: any) => {
  if (params?.value) {
    const rate =
      `${formatNumber(params.value, 1, undefined, true, "")}` as unknown as number;

    return rate > 0 ? `+${rate}%` : `${rate}%`;
  }

  return "";
};

export const basisFormatter = (params: any) => {
  if (typeof params.value === "string") {
    return params.value;
  }

  if (params.value === 0) {
    return "";
  }

  return formatNumber(Math.abs(params.value), 1, undefined, false, "");
};

export function numberWithCommas(value: any) {
  return (value ?? "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const vndFormatter = (params: any) => {
  if (!params.value || params.value === 0) {
    return "";
  }

  return numberWithCommas(params.value);
};

export const quantityFormatterForOddLot = (params: any) => {
  if (params.value) return numberWithCommas(params.value);

  return "";
};

export const quantityFormatterWithComma = (params: any) => {
  if (!params.value || params.value === 0) {
    return "";
  }

  return numberWithCommas(params.value);
};

export const getRowNodeId = (data: any) => data.code;

const COUNT_FORMATS = [
  {
    // 0 - 999
    letter: "",
    limit: 1e3,
  },
  {
    // 1,000 - 999,999
    letter: "K",
    limit: 1e6,
  },
  {
    // 1,000,000 - 999,999,999
    letter: "M",
    limit: 1e9,
  },
  {
    // 1,000,000,000 - 999,999,999,999
    letter: "B",
    limit: 1e12,
  },
  {
    // 1,000,000,000,000 - 999,999,999,999,999
    letter: "T",
    limit: 1e15,
  },
];

export const countFormatter = (value: any) => {
  if (!value) {
    return "";
  }

  let res = value;

  const format = COUNT_FORMATS.find((f) => res < f.limit);

  if (!format) {
    return "";
  }

  res = (1000 * res) / format.limit;

  res = Math.floor(res * 10) / 10;

  return format.letter ? `${res} ${format.letter}` : res;
};

export const volumeFormatter = (params: any) => {
  if (params.value === 0) {
    return "";
  }

  return countFormatter(params.value);
};

export const volumeFormatterString = (value: string) => {
  const numValue = Number(value);
  if (numValue === 0) {
    return "";
  }

  return countFormatter(numValue);
};

export const tradingValueFormatter = (params: any) => {
  if (params.value === 0) {
    return "";
  }

  return countFormatter(params.value * 1000000);
};

export const tradingValueFormatterDefault = (params: any) => {
  if (params.value === 0) {
    return "";
  }

  return countFormatter(params.value);
};

export const dateFormatter = (params: any) => {
  if (!params.value) {
    return "";
  }

  return `${params.value.substring(6)}/${params.value.substring(4, 6)}/${params.value.substring(0, 4)}`;
};
export const formatChangeAndRate = (value: any) => {
  let formatted = formatNumber(
    Math.abs(value || 0),
    2,
    undefined,
    true,
    undefined
  );

  return value > 0 ? `+${formatted}` : `${formatted}`;
};

function formatSession(value: string) {
  if (value === "ATO") {
    return Session.ATO;
  }

  if (value === "ATC") {
    return Session.ATC;
  }

  return value;
}

export const getMatchChange = (refPrice: number, matchPrice: number) => {
  if (!refPrice || !matchPrice) {
    return {
      change: 0,
      rate: 0,
    };
  }

  const change = (matchPrice || 0) - (refPrice || 0);

  const rate = refPrice ? (change * 100) / refPrice : 0;

  return {
    change,
    rate,
  };
};

/**
 *
 phangiabao 14:53 31/03
 Điểm hoà vốn = (Giá CW hiện tại * Tỷ lệ chuyển đổi + Giá thực hiện)
 * @link https://talk.vcsc.dev/vcsc/pl/toa653xg53yg881wcnjfm8azbo
 * @param matchingPrice
 * @param ratio
 * @param exercisePrice
 */
export const calculateBreakEven = (
  matchingPrice: number,
  ratio: string,
  exercisePrice: number
) => {
  try {
    if (!matchingPrice) {
      return 0;
    }
    const [mul, div] = ratio.toString().split(":");

    return (matchingPrice * +mul) / (div ? +div : 1) + exercisePrice;
  } catch (e) {
    return 0;
  }
};

export const totalFieldArray = (items: Array<any>, field: string) => {
  return items?.reduce(
    (previousValue, item) => previousValue + item?.[field],
    0
  );
};

export const isFunction = (fn: any): boolean => {
  return Object.prototype.toString.call(fn) === "[object Function]";
};

export const formatNumberOrEmpty = (params: any) => {
  if (!params.value) return "";
  return formatNumber(Math.abs(params.value), 0, undefined, false, "");
};

export const createFlagImg = (flag: string) => {
  return `<img border="0" width="16" height="16" src="/images/price-board/${flag}.svg"/>`;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const numberWithCommaToNumber = (number: string) =>
  parseFloat(number.replace(/,/g, ""));
