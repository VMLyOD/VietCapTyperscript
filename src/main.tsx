import React from "react";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { createRoot } from "react-dom/client";
import theme from "./style/mantine/theme.tsx";

const container = document.getElementById("root");
if (!container) {
  throw new Error("`root` div not found");
}
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <h1 className="text-6xl font-bold underline"></h1>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
