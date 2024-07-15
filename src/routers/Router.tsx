import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Vinor from "../pages/VinorSoft";


const Router = (): JSX.Element | null => {
  const element = useRoutes([
    {
      path: "/",
      element: <Vinor />,
    
    }
  ]);
  return element;
};
export default Router;
