import React from "react";
import HomePage from "./Components/HomePage";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Status from "./Components/Status/Status";
import StatusViewer from "./Components/Status/StatusViewer";
import Signin from "./Components/Register/Signin";
import Signup from "./Components/Register/Signup";
import Profile from "./Components/Profile/Profile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/status" element={<Status/>}></Route>
        <Route path="/status/:userid" element={<StatusViewer/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
