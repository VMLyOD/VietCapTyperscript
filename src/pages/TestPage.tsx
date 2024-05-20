import React, { useEffect, useState } from "react";
import "./TestPage.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./TestPage.css";
import SettingCheck from "~/context/CheckboxSetting/SettingCheck";
import { DemoButton } from "./bruh";
import ButtonDemo from "~/components/button/buttondemo.tsx";
import Login from "~/services/Modal/LoginTest";

const TestPage: React.FC = () => {
  return (
    <div className=" bg-green-100 h-full flex items-center flex-col">
      <ButtonDemo
        buttonType="router-link"
        to="/"
        className="w-[50%] h-10 rounded bg-blue-400 flex items-center justify-center"
      >
        Home
      </ButtonDemo>
      <DemoButton />
      <Login />
    </div>
  );
};

export default TestPage;

///////////////////////////////////////////////////////////////////////////////////
