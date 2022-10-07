import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { Reset } from "./Reset";
import Router from "./Router";

const App: React.FC = () => {
  return (
    <>
      <Reset />
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
};

export default App;
