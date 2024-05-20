import { formatData } from "~/shares/utils/formatterData";
import InstanceAxios from "../customAxios/customAxios";

export const GetGroupHose = () => {
  return InstanceAxios.get("/api/price/symbols/getByGroup?group=VN30")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching products:", error);
      return [];
    });
};

export const GetSlideRightUS = () => {
  return InstanceAxios.post("/api/price/symbols/getByGroup?group=VN30")
    .then((response) => {
      const data = response.data;
      data.symbols = ["^DJI", "^GSPC", "^IXIC", "^RUT", "^GDOW"];
      return data;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      return [];
    });
};

export const fetchSlideList = async () => {
  try {
    const response = await fetch("/SlideList.json");
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchMarketIndexData = (
  setDataFromAPI: React.Dispatch<React.SetStateAction<any>>
  // setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  // setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  InstanceAxios.post(
    "https://mt-qc.vietcap.int/api/price/marketIndex/getList",
    {
      symbols: ["VNINDEX", "VN30", "HNXIndex", "HNX30", "HNXUpcomIndex"],
    }
  )
    .then((response) => {
      setDataFromAPI(response.data);
      // setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // setError("Error fetching data. Please try again.");
      // setLoading(false);
    });
};

export const DataTablePrice = async (activeFilter: string) => {
  try {
    const symbolsResponse = await fetch(
      `https://mt.vietcap.com.vn/api/price/symbols/getByGroup?group=${activeFilter}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const symbols = await symbolsResponse.json();

    const response = await fetch(
      "https://mt-qc.vietcap.int/api/price/symbols/getList",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbols: symbols.map((symbolObj: any) => symbolObj.symbol),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const formattedData = formatData(data);
    return formattedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
