import React from "react";
import Layout from "./pages/index";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/components/Login/Login";
import { NothingFoundBackground } from "./pages/components/notFound/notFound";

interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  element?: React.ReactNode | null;
  hydrateFallbackElement?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  HydrateFallback?: React.ComponentType | null;
  ErrorBoundary?: React.ComponentType | null;
}

const App: React.FC<RouteObject> = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/404" element={<NothingFoundBackground />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
