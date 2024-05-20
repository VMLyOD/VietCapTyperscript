import React from "react";
import Dash from "~/assets/Images/dash.svg";

interface IconsTrade {
  urlImage?: string;
}
const IconsTrade = ({ urlImage = "" }) => {
  return (
    <div>
      <img className="items-center" src={urlImage} alt="icon" />
    </div>
  );
};

export default IconsTrade;
