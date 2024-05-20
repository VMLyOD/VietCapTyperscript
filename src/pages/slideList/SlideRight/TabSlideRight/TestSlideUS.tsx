import React, { useEffect, useState } from "react";
import "./SlideRight.css";

function convertSymbol(id: string) {
  if (id === "^DJI") {
    return "DOW";
  } else if (id === "^GSPC") {
    return "S&P 500";
  } else if (id === "^IXIC") {
    return "Nasdaq";
  } else if (id === "^RUT") {
    return "Russell";
  } else if (id === "^GDOW") {
    return "Global DOW";
  } else {
    return id;
  }
}

const TestSlideUS: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mt-qc.vietcap.int/api/price/globalPrice/getList",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              symbols: ["^DJI", "^GSPC", "^IXIC", "^RUT", "^GDOW"],
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slide-lage-right w-[100%] rounded">
      <div className="slide-bot-right">
        <div className="card-body">
          {data.map((item: any, index) => (
            <div key={index} className="Set-row p-2">
              <div className="items1 flex justify-between">
                <span
                  className={`price ${item.changePercent >= 0 ? "var(--mantine-color-primary-filled)" : "var(--mantine-color-red-filled)"}`}
                >
                  {convertSymbol(item.id)}
                </span>
                <span
                  className={`price ${item.changePercent >= 0 ? "var(--mantine-color-primary-filled)" : "var(--mantine-color-red-filled)"}`}
                >
                  {item.price.toLocaleString()}
                </span>
                <span
                  className={`percent ${item.changePercent >= 0 ? "var(--mantine-color-primary-filled)" : "var(--mantine-color-red-filled)"}`}
                >
                  {item.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestSlideUS;
