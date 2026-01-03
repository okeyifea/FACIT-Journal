import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginCard from "./Component/LoginCard";
import Home from "./Component/Home";
import ForgottenPassword from "./Component/ForgottenPassword";
import SignUpCard from "./Component/SignUp";
import Archive from "./Component/Archive";
import Submit from "./Component/Submit";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>      
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginCard />} />
        <Route path="/forgot-password" element={<ForgottenPassword />} />
        <Route path="/sign-up" element={<SignUpCard />} />
        <Route path="/archive" element={<Archive />} /> 
        <Route path="/submit-paper" element={<Submit />} />
      </Routes>
    </BrowserRouter>  
  );
};

export default App;