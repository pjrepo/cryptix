import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import { styled } from "@mui/material/styles";

const PREFIX = "App";

const classes = {
  app: `${PREFIX}-app`,
};

const DIV = styled("div")(() => ({
  [`&.${classes.app}`]: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

const App = () => {
  return (
    <BrowserRouter>
      <DIV className={classes.app}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<Coin />} />
        </Routes>
      </DIV>
    </BrowserRouter>
  );
};

export default App;
