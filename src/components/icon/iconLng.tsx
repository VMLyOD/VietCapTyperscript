import React from "react";
import { useTranslation } from "react-i18next";
import FlagEN from "../../assets/Images/flag-en-circle.svg";
import FlagVN from "../../assets/Images/flag-vn-circle.svg";

const IconLng: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLanguage: string = i18n.language;
  const { t } = useTranslation();

  const handleChangeLng = (lng: string): void => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };

  return (
    <div>
      <img
        src={currentLanguage === "en" ? FlagEN : FlagVN}
        alt="images language"
        className="h-[24px] w-[24px] mr-7 ml-6 cursor-pointer"
        onClick={() => handleChangeLng(currentLanguage === "en" ? "vi" : "en")}
      />
    </div>
  );
};

export default IconLng;
