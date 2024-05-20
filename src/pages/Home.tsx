import React from "react";
import SocketSlide from "~/socket/SlideBot";
import "./style.css";
import { CheckboxProvider } from "~/context/CheckboxSetting";
import GridComponent from "./TableChart/Index";

const Home: React.FC = () => {
  return (
    <CheckboxProvider>
      <div
        className="div-container"
        style={{
          height: "calc(-87px + 100vh)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SocketSlide />
        {/* <SocketSlide /> */}
        {/* <SlideList /> */}
        <GridComponent />
      </div>
    </CheckboxProvider>
  );
};

export default Home;
