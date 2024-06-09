// import React from "react";
import "./App.scss";

import {BentoProvider} from "@buildo/bento-design-system";
import { defaultMessages } from "@buildo/bento-design-system/defaultMessages/en";
import {Route, Routes} from "react-router-dom";
import Home from "./component/Home/Home.tsx";
const App = () => {

  return (
    <BentoProvider defaultMessages={defaultMessages}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/*<Route path="/test" element={<></>} />*/}
      </Routes>
    </BentoProvider>
  );
};

export default App;
