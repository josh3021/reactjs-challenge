import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="process.env.PUBLIC_URL/:coinId/*" element={<Coin />} />
        <Route path="process.env.PUBLIC_URL/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
