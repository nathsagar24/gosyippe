import React from "react";
import HomePage from "./Components/HomePage";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Status from "./Components/Status/Status";
import StatusViewer from "./Components/Status/StatusViewer";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/status" element={<Status/>}></Route>
        <Route path="/status/:userid" element={<StatusViewer/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
