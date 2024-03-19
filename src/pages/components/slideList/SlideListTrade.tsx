import React, { useState, useEffect } from "react";
import InstanceAxios from "../../../services/customAxios/customAxios";
import { Container } from "@mantine/core";
import UPP from "~/assets/Images/up.svg";
import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconPointFilled,
  IconSquareFilled,
} from "@tabler/icons-react";

interface DataItem {
  symbol: string;
  board: string;
  price: string;
  toFixed: string;
  changePercent: string;
  status: string;
  totalStockNoChange: string;
  totalStockFloor: string;
  totalStockDecline: string;
  totalStockCeiling: string;
  totalStockIncrease: string;
  totalValue: string;
  totalShares: string;
}

const SlideList: React.FC<DataItem> = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      InstanceAxios.post(
        "https://mt-qc.vietcap.int/api/price/marketIndex/getList",
        {
          symbols: ["VNINDEX", "VN30", "HNXIndex", "HNX30", "HNXUpcomIndex"],
        }
      )
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError("Error fetching data. Please try again.");
          setLoading(false);
        });
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="box-header flex w-[100%] bg-black text-white mt-[3px]">
      {data.map((item: DataItem | any) => (
        <div className="slide-lager w-[100%] flex">
          <div className="slide-medium color-custom lg:rounded w-[100%] lg:m-1">
            <div className="flex">
              <div key={item.board} className="slide-top w-[100%] m-4">
                <div className="slide-top-1 flex justify-between h-11 w-[100%]">
                  <div className="slide-top-1-left h-[100%s] flex">
                    <div className="rect-down bg-green-900 flex w-10 h-10 lg:rounded items- justify-center">
                      <div className="items-center justify-center flex">
                        <img className="items-center" src={UPP} alt="icon" />
                      </div>
                    </div>
                    <div className="ml-3 h-[44px] w-[84px]">
                      <div className="info-index-name ">
                        <h3>{item.symbol}</h3>
                      </div>
                      <div className="info-index-point text-sm">
                        <h3>{item.price}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="slide-top-1-right">
                    <div>
                      <div className="info-index-name">
                        <h3>
                          {(item.changePercent < 0
                            ? item.changePercent * -1
                            : item.changePercent
                          ).toFixed(2)}
                          %
                        </h3>
                      </div>
                      <div className="info-index-point">
                        <h3>
                          {(item.change < 0
                            ? item.change * -1
                            : item.change
                          ).toFixed(2)}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="slide-top-2 flex items-center h-5">
                  <span className="data-time-custom color-index-custom">
                    KL: {item.totalShares.toLocaleString("en-US")}
                  </span>
                  <span className="dot">
                    {" "}
                    <IconPointFilled
                      style={{ width: "15px", height: "15px" }}
                    />
                  </span>
                  <span className="data-time-custom ml-2 data-time-custom--right">
                    GT: {item.totalValue.toLocaleString("en-US")} Tỷ
                  </span>
                </div>
                <div className="slide-top-3 flex justify-between">
                  <div className="slide-top-3-1  items-center flex">
                    <h3 className="data-custom-1 flex items-center text-green-600">
                      <IconCaretUpFilled
                        className="mr-1"
                        style={{ width: "15px", height: "15px" }}
                      />
                      {item.totalStockIncrease}
                      <span className="text-purple-600">
                        ({item.totalStockCeiling})
                      </span>
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
                      {item.totalStockIncrease}
                      <span className="text-blue-500">
                        ({item.totalStockFloor})
                      </span>
                    </h3>
                  </div>
                  <div className="box-status bg-slate-700 w-[59px] h-[18px] lg:rounded-sm">
                    <span className="dot-custom-status flex items-center justify-start">
                      <IconPointFilled
                        style={{ width: "15px", height: "15px" }}
                      />
                      Status
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="slide-bottom w-[100%] ">
              <div className="m-4 h-[58px] lg:rounded-sm "></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlideList;
