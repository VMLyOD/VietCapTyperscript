import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { fetchSlideList } from "~/services/api/Index";
import SlideListNew from "~/pages/components/slideList/SlideListNew";
import { DataItem } from "~/pages/components/slideList/SlideListTrade";

const SocketSlide = () => {
  const [dataFromAPI, setDataFromAPI] = useState<DataItem | any>(null);
  // console.log("dataFromAPI", dataFromAPI);
  const [dataFromSocket, setDataFromSocket] = useState<DataItem | any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  // console.log("socket", socket);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSlideList();
        setDataFromAPI(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching slide list: ", error);
        setIsLoading(false);
      }
    };

    fetchData();

    const newSocket = io("http://localhost:4500");
    setSocket(newSocket);
    // console.log("newSocket local", newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to server");
      });

      socket.on("price-change", ({ price }) => {
        setDataFromAPI((prevData: any) => [...prevData, price]);
      });

      return () => {
        socket.off("connect");
        socket.off("price-change");
      };
    }
  }, [socket]);

  const combinedData = dataFromSocket || dataFromAPI;

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <SlideListNew data={socket === null ? [combinedData] : dataFromAPI} />
      )}
    </div>
  );
};

export default SocketSlide;
