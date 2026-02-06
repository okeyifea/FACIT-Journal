import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginCard from "./Component/LoginCard.jsx";
import Home from "./Component/Home.jsx";
import Profile from "./Component/Profile.jsx";
import ForgottenPassword from "./Component/ForgottenPassword.jsx";
import SignUpCard from "./Component/SignUp.jsx";
import Archive from "./Component/Archive.jsx";
import Submit from "./Component/Submit.jsx";
import ProtectedRoute from "./Component/Common/ProctectedRoute.jsx";
import MyPaper from "./Component/My-Paper.jsx";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
  const loadUser = async () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  };
  loadUser();
}, []);


  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginCard setUser={setUser} />} />
        <Route path="/forgot-password" element={<ForgottenPassword />} />
        <Route path="/sign-up" element={<SignUpCard />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute user={user} isLoading={isLoading} />}>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path="/archive" element={<Archive user={user} setUser={setUser} />} />
          <Route path="/submit-paper" element={<Submit user={user} setUser={setUser} />} /> 
          <Route path="/my-papers" element={<MyPaper user={user} setUser={setUser} />} />
        </Route>

        {/* Default route: always go to login if user is not logged in */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
