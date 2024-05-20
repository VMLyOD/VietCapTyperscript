import { randomId } from "@mantine/hooks";

export interface ArrayItem {
  value: string;
  label: string;
  link: string;
  icon?: string;
}

export const TTS = [
  { label: "Trần", checked: false, key: randomId() },
  { label: "Sàn", checked: false, key: randomId() },
  { label: "Tham chiếu", checked: false, key: randomId() },
];

export const Kl = [
  { label: "Giá", checked: false, key: randomId() },
  { label: "KL", checked: false, key: randomId() },
  { label: "% & +/-", checked: false, key: randomId() },
  { label: "KLGD & GTGD", checked: false, key: randomId() },
];

export const Dm = [
  { label: "Giá $ KL 3", checked: false, key: randomId() },
  { label: "Giá $ KL 2", checked: false, key: randomId() },
  { label: "Giá $ KL 1  ", checked: false, key: randomId() },
];

export const CTT = [
  { label: "Cao", checked: false, key: randomId() },
  { label: "Trung bình", checked: false, key: randomId() },
  { label: "Thấp", checked: false, key: randomId() },
];

export const Db = [
  { label: "Giá $ KL 3", checked: false, key: randomId() },
  { label: "Giá $ KL 2", checked: false, key: randomId() },
  { label: "Giá $ KL 1  ", checked: false, key: randomId() },
];

export const Asset1: ArrayItem[] = [
  {
    value: "1",
    label: "Portfolio management",
    link: "/404",
  },
  {
    value: "2",
    label: "Profit/Loss report",
    link: "/404",
  },
];

export const Support: ArrayItem[] = [
  {
    value: "3",
    label: "Terms and Conditions",
    link: "/404",
  },
];

export const Asset2: ArrayItem[] = [
  {
    value: "1",
    label: "Derivative asset information",
    link: "/404",
  },
  {
    value: "2",
    label: "Accumulated Profit/Loss",
    link: "/404",
  },
];

export const Tool: ArrayItem[] = [
  {
    value: "1",
    label: "Maket Watch",
    link: "/404",
  },
  {
    value: "2",
    label: "Company information",
    link: "/404",
  },
  {
    value: "3",
    label: "Seclector information",
    link: "/404",
  },
  {
    value: "4",
    label: "VietCap IQ",
    link: "/404",
  },
];

export const Tool2: ArrayItem[] = [
  {
    value: "1",
    label: "Maket Watch",
    link: "/404",
  },
  {
    value: "2",
    label: "Company information",
    link: "/404",
  },
  {
    value: "3",
    label: "Seclector information",
    link: "/404",
  },
  {
    value: "4",
    label: "VietCap IQ",
    link: "/404",
  },
];

export const StockItem1: ArrayItem[] = [
  {
    value: "1",
    label: "Order",
    link: "/404",
  },
  {
    value: "2",
    label: "Order book",
    link: "/404",
  },
  {
    value: "3",
    label: "Right subscriptions",
    link: "/404",
  },
  {
    value: "4",
    label: "Stock transfer",
    link: "/404",
  },
  {
    value: "5",
    label: "Order history",
    link: "/404",
  },
  {
    value: "6",
    label: "Transaction history",
    link: "/404",
  },
];

export const STOCK2: ArrayItem[] = [
  {
    value: "1",
    label: "Cash advance",
    link: "/404",
  },
  {
    value: "2",
    label: "Withdraw money",
    link: "/404",
  },
  {
    value: "3",
    label: "Internal transfer",
    link: "/404",
  },
  {
    value: "4",
    label: "Transfer to other Vietcap account",
    link: "/404",
  },
  {
    value: "5",
    label: "Deposit Cash by QR Code",
    link: "/404",
  },
];

export const StockItem2: ArrayItem[] = [
  {
    value: "1",
    label: "Order",
    link: "/404",
  },
  {
    value: "2",
    label: "Order book",
    link: "/404",
  },
  {
    value: "3",
    label: "Order history",
    link: "/404",
  },
];

export const Cash2: ArrayItem[] = [
  {
    value: "1",
    label: "Internal Derivative Transfer",
    link: "/404",
  },
  {
    value: "2",
    label: "Deposit/Withdraw cash",
    link: "/404",
  },
  {
    value: "3",
    label: "Deposit Cash by QR Code",
    link: "/404",
  },
];

export const Sort1: ArrayItem[] = [
  {
    value: "1",
    label: "HOSE",
    link: "/404",
  },
  {
    value: "2",
    label: "VN30",
    link: "/404",
  },
  {
    value: "3",
    label: "VNMidCap",
    link: "/404",
  },
  {
    value: "4",
    label: "VNSmallCap",
    link: "/404",
  },
  {
    value: "5",
    label: "VNAllShare",
    link: "/404",
  },
  {
    value: "6",
    label: "VN100",
    link: "/404",
  },
  {
    value: "7",
    label: "ETF",
    link: "/404",
  },
  {
    value: "8",
    label: "Put Through HOSE",
    link: "/404",
  },
  {
    value: "9",
    label: "Odd lot HOSE",
    link: "/404",
  },
];

export const Sort2: ArrayItem[] = [
  {
    value: "1",
    label: "HNX",
    link: "/404",
  },
  {
    value: "2",
    label: "VN30",
    link: "/404",
  },
  {
    value: "3",
    label: "HNX30",
    link: "/404",
  },
  {
    value: "4",
    label: "HNXCon",
    link: "/404",
  },
  {
    value: "5",
    label: "HNXFin",
    link: "/404",
  },
  {
    value: "6",
    label: "HNXLCap",
    link: "/404",
  },
  {
    value: "7",
    label: "HNXMSCap",
    link: "/404",
  },
  {
    value: "8",
    label: "HNXMan",
    link: "/404",
  },
  {
    value: "9",
    label: "Put Through HNX",
    link: "/404",
  },
  {
    value: "10",
    label: "Odd lot HNX",
    link: "/404",
  },
];

export const Sort3: ArrayItem[] = [
  {
    value: "1",
    label: "UPCOM",
    link: "/404",
  },
  {
    value: "2",
    label: "Put Through UPCOM",
    link: "/404",
  },
  {
    value: "3",
    label: "Odd lot UPCOM",
    link: "/404",
  },
];

export const Sort4: ArrayItem[] = [
  {
    value: "1",
    label: "VN30-Index Futures",
    link: "/404",
  },
  {
    value: "2",
    label: "Gov.Bond Futures",
    link: "/404",
  },
];

export const Sort5: ArrayItem[] = [
  {
    value: "1",
    label: "All Sectors",
    link: "/404",
  },
  {
    value: "2",
    label: "Oil & Gas",
    link: "/404",
  },
  {
    value: "3",
    label: "Chemicals",
    link: "/404",
  },
  {
    value: "4",
    label: "Basic Resources",
    link: "/404",
  },
  {
    value: "5",
    label: "Construction & Materials",
    link: "/404",
  },
  {
    value: "6",
    label: "Industrial Goods & Services",
    link: "/404",
  },
  {
    value: "7",
    label: "Automobiles & Parts",
    link: "/404",
  },
  {
    value: "8",
    label: "Food & Beverage",
    link: "/404",
  },
  {
    value: "9",
    label: "Personal & Household Goods",
    link: "/404",
  },
  {
    value: "10",
    label: "Health Care",
    link: "/404",
  },
  {
    value: "11",
    label: "Retail",
    link: "/404",
  },
  {
    value: "12",
    label: "Media",
    link: "/404",
  },
  {
    value: "13",
    label: "Travel & Leisure",
    link: "/404",
  },
  {
    value: "14",
    label: "Telecommunications",
    link: "/404",
  },
  {
    value: "15",
    label: "Utilities",
    link: "/404",
  },
  {
    value: "16",
    label: "Automobiles & Parts",
    link: "/404",
  },
  {
    value: "17",
    label: "Banks",
    link: "/404",
  },
  {
    value: "18",
    label: "Insurance",
    link: "/404",
  },

  {
    value: "19",
    label: "Telecommunications",
    link: "/404",
  },
  {
    value: "20",
    label: "Real Estate",
    link: "/404",
  },
  {
    value: "21",
    label: "Financial Services",
    link: "/404",
  },
  {
    value: "22",
    label: "Technology",
    link: "/404",
  },
];
