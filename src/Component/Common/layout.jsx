import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SideNav from "../SideNav";
import { useToast } from "./Toast.jsx";

const Layout = ({ children, user, setUser }) => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleLogout = () => {
    const name = user?.username || user?.fullName || "User";
    addToast(`Goodbye, ${name}`);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser?.(null);
    navigate("/login");
  };

  return (
    <Root>
      <SideNav user={user} onLogout={handleLogout} />
      <Main>{children}</Main>
    </Root>
  );
};

export default Layout;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

const Main = styled.main`
  flex: 1;
  margin-left: 270px;
  min-height: 100vh;
  width: calc(100% - 270px);
  left: 0;

  @media (max-width: 900px) {
    margin-left: 220px;
    padding: 90px 20px 30px;
  }

  @media (max-width: 640px) {
    margin-left: 0;
    padding: 96px 16px 24px;
  }
`;
