import React from "react";
import ButtonDemo from "~/components/button/buttondemo";
import "./Style.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="Footer-container flex h-[30px]">
      <div>
        Cơ sở: Giá: x1000 - Khối lượng: x10 | Phái sinh và Trái phiếu: Giá: x1 -
        Khối lượng: x1
      </div>
      <div className="btn-container">
        {/* <ButtonDemo
          className="btn1"
          onClick={handleScrollTop}
          color="btncpn-none"
          textColor="gray"
        >
          TOP
        </ButtonDemo> */}
        <ButtonDemo
          className="btn1"
          buttonType="router-link"
          to="/login"
          color="btncpn-none"
          textColor="gray"
        >
          OTP
        </ButtonDemo>
        |
        <ButtonDemo className="btn2" color="btncpn-none" textColor="gray">
          Asset
        </ButtonDemo>
        |
        <ButtonDemo className="btn3" color="btncpn-none" textColor="gray">
          Order history
        </ButtonDemo>
        |
        <ButtonDemo className="btn4" color="btncpn-none" textColor="gray">
          Order book
        </ButtonDemo>
        <ButtonDemo
          className="btn-order"
          color="btncpn-none"
          isUppercase
          textColor="gray"
        >
          Order
        </ButtonDemo>
      </div>
    </div>
  );
};

export default Footer;
