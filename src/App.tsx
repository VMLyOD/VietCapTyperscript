import React from "react";
import Layout from "./pages/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import { NothingFoundBackground } from "./pages/notFound/notFound";
import TestPage from "./pages/TestPage";
import { ThemeProvider } from "./context/ThemeContext";
import { ForgotPassword } from "./pages/Login/ForgotPass";
import { CollapseProvider } from "./context/CollapseContext";

import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { GridChartsModule } from "@ag-grid-enterprise/charts-enterprise";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { LicenseManager } from "@ag-grid-enterprise/core";
import { AG_GRID_KEY } from "./shares/utils";

LicenseManager.setLicenseKey(AG_GRID_KEY);

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  MasterDetailModule,
  MenuModule,
  GridChartsModule,
  RowGroupingModule,
]);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CollapseProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="404" element={<NothingFoundBackground />} />
            </Route>
            <Route path="testpage" element={<TestPage />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Routes>
        </BrowserRouter>
      </CollapseProvider>
    </ThemeProvider>
  );
};

export default App;
