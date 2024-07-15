import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Router from "./routers/Router";
function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
