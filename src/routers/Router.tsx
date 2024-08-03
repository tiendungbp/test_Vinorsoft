import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { Test } from "../pages/Vinorsoft";
const Router = (): JSX.Element | null => {
  const element = useRoutes([
    {
      path: "/",
      element: <Test />,
    },
  ]);
  return element;
};
export default Router;
