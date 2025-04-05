import React from "react";
import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../admins/pages/Dashboard";

const AppRoutes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/dashboad", element: <Dashboard /> },
];
export default AppRoutes;
