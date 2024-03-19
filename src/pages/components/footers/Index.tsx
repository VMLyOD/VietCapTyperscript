import React from "react";
import ButtonDemo from "~/components/button/buttondemo";
import "./Style.css";

const Footer = () => {
  return (
    <div className="Footer-container flex">
      <div>
        Cơ sở: Giá: x1000 - Khối lượng: x10 | Phái sinh và Trái phiếu: Giá: x1 -
        Khối lượng: x1
      </div>
      <div className="btn-container">
        <ButtonDemo className="btn1" color="none" textColor="gray">
          OTP
        </ButtonDemo>
        |
        <ButtonDemo className="btn2" color="none" textColor="gray">
          Asset
        </ButtonDemo>
        |
        <ButtonDemo className="btn3" color="none" textColor="gray">
          Order History
        </ButtonDemo>
        |
        <ButtonDemo className="btn4" color="none" textColor="gray">
          Order Book
        </ButtonDemo>
        <ButtonDemo className="btn-order" color="none" textColor="gray">
          ORDER
        </ButtonDemo>
      </div>
    </div>
  );
};

export default Footer;
