import React from "react";

const SlideItemVNINDEX = ({ item }) => {
  return (
    <div>
      <h2>{item.symbol}</h2>
      <p>Price: {item.price}</p>
    </div>
  );
};

export default SlideItemVNINDEX;
