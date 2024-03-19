import React, { useEffect, useState } from "react";

const DataTime: React.FC = () => {
  const [formattedDateTime, setFormattedDateTime] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      const dateTime = new Date();
      const formattedDateTime = formatDateTime(dateTime);
      setFormattedDateTime(formattedDateTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (dateTime: Date) => {
    const hour = dateTime.getHours().toString().padStart(2, "0");
    const minute = dateTime.getMinutes().toString().padStart(2, "0");
    const second = dateTime.getSeconds().toString().padStart(2, "0");
    const date = dateTime.getDate().toString().padStart(2, "0");
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    const year = dateTime.getFullYear();
    return `${hour}:${minute}:${second} | ${date}/${month}/${year}`;
  };
  return <>{formattedDateTime}</>;
};

export default DataTime;
