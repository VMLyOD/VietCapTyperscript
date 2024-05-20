/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import protobufjs from "protobufjs";
import { Socket } from "socket.io-client";
import get from "lodash/get";
import { fetchMarketIndexData } from "~/services/api/Index";
import SlideListNew from "~/pages/slideList/SlideListNew";

export const loadPriceProto = (path: string = "/") => {
  return new Promise((resolve, reject) => {
    protobufjs.load(path + "price.proto", function (err, root) {
      const matchPriceMessageProtoLK = root?.lookupType(
        "pricePackage.MatchPriceMessage"
      );
      const oddLotMatchPriceMessageProtoLK = root?.lookupType(
        "pricePackage.OddLotMatchPriceMessage"
      );
      const matchPriceFUMessageProtoLK = root?.lookupType(
        "pricePackage.FutureMatchPrice"
      );
      const bidAskMessageProtoLK = root?.lookupType(
        "pricePackage.BidAskMessage"
      );
      const oddLotBidAskMessageProtoLK = root?.lookupType(
        "pricePackage.OddLotBidAskMessage"
      );

      const indexMessageProtoLK = root?.lookupType("pricePackage.IndexMessage");
      const putThroughMessageProtoLK = root?.lookupType(
        "pricePackage.PutThroughMessage"
      );
      const advertiseMessageProtoLK = root?.lookupType(
        "pricePackage.AdvertiseMessage"
      );

      if (
        matchPriceMessageProtoLK == undefined ||
        oddLotMatchPriceMessageProtoLK == undefined ||
        bidAskMessageProtoLK == undefined ||
        oddLotBidAskMessageProtoLK == undefined ||
        indexMessageProtoLK == undefined ||
        putThroughMessageProtoLK == undefined
      ) {
        reject("Not found proto file");
      }

      const matchPriceMessageProto = matchPriceMessageProtoLK;
      const oddLotMatchPriceMessageProto = oddLotMatchPriceMessageProtoLK;
      const bidAskMessageProto = bidAskMessageProtoLK;
      const oddLotBidAskMessageProto = oddLotBidAskMessageProtoLK;
      const indexMessageProto = indexMessageProtoLK;
      const putThroughMessageProto = putThroughMessageProtoLK;
      const futureMatchPrice = matchPriceFUMessageProtoLK;
      const advertiseMessageProto = advertiseMessageProtoLK;

      resolve({
        matchPriceMessageProto,
        oddLotMatchPriceMessageProto,
        bidAskMessageProto,
        oddLotBidAskMessageProto,
        indexMessageProto,
        putThroughMessageProto,
        futureMatchPrice,
        advertiseMessageProto,
      });
    });
  });
};

export function ParserMessage<T>(
  messageKey: string,
  buffer: Buffer,
  socket: Socket
) {
  if (!socket) return null;
  const value: any = get(socket, `priceProto.${messageKey}`);

  if (value) {
    const message = value.decode(new Uint8Array(buffer));
    const object = value.toObject(message, {
      longs: String,
      enums: String,
      bytes: String,
    });

    return object as T;
  }
  return null;
}

// newSocket.disconnect();

const SocketSlide: React.FC = () => {
  const priceConnection: any = useRef(null);
  const [socket, setSocket] = useState<Socket | any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataFromAPI, setDataFromAPI] = useState<DataTransferItem | any>();

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const data = await fetchSlideList();
    //     setDataFromAPI(data);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // fetchData();

    const fetchData = async () => {
      try {
        await fetchMarketIndexData(setDataFromAPI);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching market index data: ", error);
        setIsLoading(false);
      }
    };

    fetchData();

    const newSocket = io("wss://mt.vietcap.com.vn", {
      path: "/ws/price/socket.io",
      transports: ["websocket"],
    });
    setSocket(newSocket);
    return () => {
      newSocket.off("connect");
      newSocket.off("index");
    };
  }, []);

  useEffect(() => {
    if (socket) {
      const connectSocket = async () => {
        const priceProto = await loadPriceProto();
        socket.priceProto = priceProto;
        socket.on("connect", () => {
          console.log("Connected to server  MT VIETCAP");
          priceConnection.current = socket;
          socket.emit(
            "index",
            JSON.stringify({
              symbols: [
                "VNINDEX",
                "VN30",
                "HNXIndex",
                "HNX30",
                "HNXUpcomIndex",
              ],
            })
          );
        });
        socket.on("index", (newData: any) => {
          const event = ParserMessage(
            "indexMessageProto",
            newData,
            priceConnection.current
          );
          if (event) {
            setDataFromAPI((prevData: any) => [...prevData, event]);
          }
        });
      };
      connectSocket();
      return () => {
        socket.off("connect");
        socket.off("index");
      };
    }
  }, [socket]);

  return (
    <div>
      {isLoading ? <div>Loading...</div> : <SlideListNew data={dataFromAPI} />}
    </div>
  );
};

export default React.memo(SocketSlide);
