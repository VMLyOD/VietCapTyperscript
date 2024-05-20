export enum CellClassName {
  CEIL = "ceilclass",
  FLOOR = "floorclass",
  REF = "ref",
  UP = "up",
  DOWN = "down",
  DEFAULT = "default",
}

export enum Session {
  ATO = -1,
  ATC = -2,
}

export const valueClassRules = {
  [CellClassName.CEIL]: "value === data?.Ceil",
  [CellClassName.FLOOR]: "value === data?.Floor",
  [CellClassName.REF]: "value === data?.Ref || [-1, -2].includes(value)",
  [CellClassName.UP]:
    "value !== data?.Ceil && value !== data?.Floor && value > data?.Ref",
  [CellClassName.DOWN]:
    "value !== data?.Ceil && value !== data?.Floor && value < data?.Ref",
};

export const valueClassVol = {
  [CellClassName.CEIL]: "data?.BidPrice1 === data?.Floor",
  [CellClassName.FLOOR]: "data?.BidPrice1 === data?.Floor",
  [CellClassName.REF]:
    "data?.BidPrice1 === data?.Ref || [-1, -2].includes(value)",
  [CellClassName.UP]:
    "data?.BidPrice1 !== data?.Ceil && value !== data?.Floor && value > data?.Ref",
  [CellClassName.DOWN]:
    "data?.BidPrice1 !== data?.Ceil && value !== data?.Floor && value < data?.Ref",
};

export const valueClassMatVol = {
  [CellClassName.CEIL]: "data?.MatPrice === data?.Ceil",
  [CellClassName.FLOOR]: "data?.MatPrice === data?.Floor",
  [CellClassName.REF]:
    "data?.MatPrice === data?.Ref || [-1, -2].includes(value)",
  [CellClassName.UP]:
    "data?.MatPrice !== data?.Ceil && value !== data?.Floor && value > data?.Ref",
  [CellClassName.DOWN]:
    "data?.MatPrice !== data?.Ceil && value !== data?.Floor && value < data?.Ref",
};

export const bidClassRules = (index: number) => {
  const price = `data?.bidOfferList?.[${index}]?.bidPrice`;

  const vol = `data?.bidOfferList?.[${index}]?.bidVolume`;

  return {
    [CellClassName.CEIL]: `${price} === data?.Ceil`,
    [CellClassName.FLOOR]: `${price} === data?.Floor`,
    [CellClassName.REF]: `${price} === -1 || ${price} === -2 || ${price} === data?.Ref`,
    [CellClassName.UP]: `${price} !== data?.Ceil && ${price} !== data?.Floor && ${price} > data?.Ref`,
    [CellClassName.DOWN]: `${price} !== data?.Ceil && ${price} !== data?.Floor && ${price} < data?.Ref`,
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

export const defaultClassRules = {
  [CellClassName.DEFAULT]: "value === data?.MatTVol",
};
export const default1ClassRules = {
  [CellClassName.DEFAULT]: "value === data?.Bought",
};
export const default2ClassRules = {
  [CellClassName.DEFAULT]: "value === data?.Sold",
};

export const tickerClassRules = () => {
  const value = `data?.MatPrice`;
  return {
    [CellClassName.CEIL]: `${value} === data?.Ceil`,
    [CellClassName.FLOOR]: `${value} === data?.Floor`,
    [CellClassName.REF]: `${value} === data?.Ref`,
    [CellClassName.UP]: `${value} !== data?.Ceil && ${value} !== data?.Floor && ${value} > data?.Ref`,
    [CellClassName.DOWN]: `${value} !== data?.Ceil && ${value} !== data?.Floor && ${value} < data?.Ref`,
  };
};

export const BidClassRules = () => {
  const value = `data?.BidPrice1`;
  return {
    [CellClassName.CEIL]: `${value} === data?.Ceil`,
    [CellClassName.FLOOR]: `${value} === data?.Floor`,
    [CellClassName.REF]: `${value} === data?.Ref`,
    [CellClassName.UP]: `${value} !== data?.Ceil && ${value} !== data?.Floor && ${value} > data?.Ref`,
    [CellClassName.DOWN]: `${value} !== data?.Ceil && ${value} !== data?.Floor && ${value} < data?.Ref`,
  };
};
export const BidClassRules2 = () => {
  const value = `data?.BidPrice2`;
  return {
    [CellClassName.CEIL]: `${value} === data?.Ceil`,
    [CellClassName.FLOOR]: `${value} === data?.Floor`,
    [CellClassName.REF]: `${value} === data?.Ref`,
    [CellClassName.UP]: `${value} !== data?.Ceil && ${value} !== data?.Floor && ${value} > data?.Ref`,
    [CellClassName.DOWN]: `${value} !== data?.Ceil && ${value} !== data?.Floor && ${value} < data?.Ref`,
  };
};
export const BidClassRules3 = () => {
  const value = `data?.BidPrice3`;
  return {
    [CellClassName.CEIL]: `${value} === data?.Ceil`,
    [CellClassName.FLOOR]: `${value} === data?.Floor`,
    [CellClassName.REF]: `${value} === data?.Ref`,
    [CellClassName.UP]: `${value} !== data?.Ceil && ${value} !== data?.Floor && ${value} > data?.Ref`,
    [CellClassName.DOWN]: `${value} !== data?.Ceil && ${value} !== data?.Floor && ${value} < data?.Ref`,
  };
};

export const AskClassRules = () => {
  const value = `data?.AskPrice1`;
  return {
    [CellClassName.CEIL]: `${value} === data?.Ceil`,
    [CellClassName.FLOOR]: `${value} === data?.Floor`,
    [CellClassName.REF]: `${value} === data?.Ref`,
    [CellClassName.UP]: `${value} !== data?.Ceil && ${value} !== data?.Floor && ${value} > data?.Ref`,
    [CellClassName.DOWN]: `${value} !== data?.Ceil && ${value} !== data?.Floor && ${value} < data?.Ref`,
  };
};
export const AskClassRules2 = () => {
  const value = `data?.AskPrice2`;
  return {
    [CellClassName.CEIL]: `${value} === data?.Ceil`,
    [CellClassName.FLOOR]: `${value} === data?.Floor`,
    [CellClassName.REF]: `${value} === data?.Ref`,
    [CellClassName.UP]: `${value} !== data?.Ceil && ${value} !== data?.Floor && ${value} > data?.Ref`,
    [CellClassName.DOWN]: `${value} !== data?.Ceil && ${value} !== data?.Floor && ${value} < data?.Ref`,
  };
};
export const AskClassRules3 = () => {
  const value = `data?.AskPrice3`;
  return {
    [CellClassName.CEIL]: `${value} === data?.Ceil`,
    [CellClassName.FLOOR]: `${value} === data?.Floor`,
    [CellClassName.REF]: `${value} === data?.Ref`,
    [CellClassName.UP]: `${value} !== data?.Ceil && ${value} !== data?.Floor && ${value} > data?.Ref`,
    [CellClassName.DOWN]: `${value} !== data?.Ceil && ${value} !== data?.Floor && ${value} < data?.Ref`,
  };
};

export const TVolClassRules = () => {
  const value = `data?.MatPx`;
  return {
    [CellClassName.CEIL]: `${value} > 6.7`,
    [CellClassName.FLOOR]: `${value} < -6.7`,
    [CellClassName.REF]: `${value} === data?.Ref`,
    [CellClassName.UP]: `${value} > 0`,
    [CellClassName.DOWN]: `${value} < 0`,
  };
};
