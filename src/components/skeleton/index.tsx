import { Skeleton } from "@mui/material";
import React from "react";

const index = () => {
  return (
    <div className="p-1 bg-green-700 w-[100%]">
      <Skeleton
        className="bg-green-500"
        animation="wave"
        width="100%"
        height={60}
      />
      <Skeleton
        className="bg-green-500"
        animation="wave"
        width="100%"
        height={60}
      />
      <Skeleton
        className="bg-green-500"
        animation="wave"
        width="100%"
        height={60}
      />
    </div>
  );
};

export default index;
