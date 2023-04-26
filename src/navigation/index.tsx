import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import HomePage from "../pages/Home";
import Protected from "./Protected";
import Unprotected from "./Unprotected";

function RootNavigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Protected/>}>
          <Route path="/" element={<HomePage/>}/>
        </Route>

        <Route element={<Unprotected/>}>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RootNavigation;
