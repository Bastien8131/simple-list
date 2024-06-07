import React from "react";
import "./App.scss";

// import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { BentoProvider, Actions, List } from "@buildo/bento-design-system";
import { defaultMessages } from "@buildo/bento-design-system/defaultMessages/en";
import ListCollection from "./component/ListCollection/ListCollection";

const App = () => {
  return (
    <BentoProvider defaultMessages={defaultMessages}>
      <nav></nav>
      <Router>
        <Routes>
          <Route path="/" element={<ListCollection />} />
          <Route path="/about" element={<>hello</>} />
        </Routes>
      </Router>
    </BentoProvider>
  );
};

export default App;
