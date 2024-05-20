import React from "react";
import VietCapLogo from "~/components/icon/VietCapLogo";
import DataTime from "~/components/dataTime/dataTimeReal";

const HeaderLeft: React.FC = () => {
  return (
    <div className="myheader-left flex lg:items-center lg:text-white">
      <VietCapLogo />
    </div>
  );
};

export default HeaderLeft;
