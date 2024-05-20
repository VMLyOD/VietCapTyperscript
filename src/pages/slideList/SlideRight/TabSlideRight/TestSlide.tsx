import React, { useEffect, useState } from "react";
import "./SlideRight.css";
import { convertPercent } from "../../SlideItem";

interface SymbolMap {
  [key: string]: string;
}

const symbolMapAS: SymbolMap = {
  "^ADOW": "Asia Dow",
  "^N225": "Nikkei 225",
  "^HSI": "Hang Seng",
  "000001.SS": "Shanghai",
  "^STI": "Singapore",
};

const symbolMapEU: SymbolMap = {
  "^FTSE": "FTSE 100",
  "^STOXX": "Stoxx 600",
  "^GDAXI": "DAX",
  "^FCHI": "CAC 40",
  "FTSEMIB.MI": "FTSE MIB",
};

const symbolMapUS: SymbolMap = {
  "^DJI": "DOW",
  "^GSPC": "S&P 500",
  "^IXIC": "Nasdaq",
  "^RUT": "Russel",
  "^GDOW": "Global DOW",
};

const symbolMapCM: SymbolMap = {
  "CL=F": "Crude Oil(USD/Bbl)",
  "GC=F": "Gold (USD/t.oz)",
  "SI=F": "Sliver (USD/t.oz)",
  "HG=F": "Copper (USD/Lbs",
  "ZR=F": "Rice (USD/CWT)",
};

const symbolMapOT: SymbolMap = {
  "VND=X": "VND/USD",
  "^TNX": "US 10 year (%)",
  "BTC-USD": "Bitcoin (USD)",
  "ETH-USD": "Ethereum (USD)",
};

const fetchData = async (symbols: string[]) => {
  try {
    const response = await fetch(
      "https://mt-qc.vietcap.int/api/price/globalPrice/getList",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symbols }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const TestSlide: React.FC<{ symbols: string[] }> = ({ symbols }) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData(symbols).then((data) => setData(data));
    }, 1000);
    return () => clearInterval(interval);
  }, [symbols]);

  return (
    <div className="slide-lage-right w-[100%] rounded h-[131px]">
      <div className="slide-bot-right">
        <div className="card-body h-full">
          {data.map((item: any, index) => (
            <div key={index} className="Set-row p-1">
              <div className="items1 justify-between w-[100%] flex">
                <span
                  className={`price  ${item.changePercent > 0 ? "color-green" : item.changePercent == 0 ? "color-yellow" : "color-red"}`}
                  style={{ flex: 2, justifyContent: "flex-start" }}
                >
                  {symbols === ASymbols && symbolMapAS[item.id]}
                  {symbols === EUSymbols && symbolMapEU[item.id]}
                  {symbols === USSymbols && symbolMapUS[item.id]}
                  {symbols === CMSymbols && symbolMapCM[item.id]}
                  {symbols === OTSymbols && symbolMapOT[item.id]}
                </span>

                <span
                  className={`price2 ${item.changePercent > 0 ? "color-green" : item.changePercent == 0 ? "color-yellow" : "color-red"}`}
                  style={{ flex: 1 }}
                >
                  {item.price.toLocaleString()}
                </span>
                <span
                  className={`price3 ${item.changePercent > 0 ? "color-green" : item.changePercent == 0 ? "color-yellow" : "color-red"}`}
                  style={{ flex: 1 }}
                >
                  {convertPercent(item.changePercent.toFixed(2))}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ASymbols = ["^ADOW", "^N225", "^HSI", "000001.SS", "^STI"];
const EUSymbols = ["^FTSE", "^STOXX", "^GDAXI", "^FCHI", "FTSEMIB.MI"];
const USSymbols = ["^DJI", "^GSPC", "^IXIC", "^RUT", "^GDOW"];
const CMSymbols = ["CL=F", "GC=F", "SI=F", "HG=F", "ZR=F"];
const OTSymbols = ["VND=X", "^TNX", "BTC-USD", "ETH-USD"];

export const TestSlideAS: React.FC = () => {
  return <TestSlide symbols={ASymbols} />;
};

export const TestSlideEU: React.FC = () => {
  return <TestSlide symbols={EUSymbols} />;
};

export const TestSlideUS: React.FC = () => {
  return <TestSlide symbols={USSymbols} />;
};

export const TestSlideCM: React.FC = () => {
  return <TestSlide symbols={CMSymbols} />;
};

export const TestSlideOT: React.FC = () => {
  return <TestSlide symbols={OTSymbols} />;
};

export default TestSlide;
