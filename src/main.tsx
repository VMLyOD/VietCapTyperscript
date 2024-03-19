import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import theme from "./style/mantine/theme.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <h1 className="text-6xl font-bold underline"></h1>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
