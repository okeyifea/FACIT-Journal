import React from "react";
import {
  Container,
  TopSection,
  Brand,
  Logo,
  Title,
  User,
  UserInfo,
  Name,
  Role,
  NavList,
  NavItem,
  Footer,
  LogoutButton,
  LoginButton,
  Icon
} from "../Style/SideNavStyle.jsx";
import { useNavigate } from "react-router-dom";
import AvaterIcon from "../Component/Common/Icons/User Icon.svg";
import HomeIcon from "../Component/Common/Icons/Home Icon.svg";
import ArchiveIcon from "../Component/Common/Icons/Archive Icon.svg";
import SubmitIcon from "../Component/Common/Icons/Submit Icon.svg";
import ProfileIcon from "../Component/Common/Icons/User Icon.svg";
import ApprovalIcon from "../Component/Common/Icons/Approval Icon.svg";
import DashboardIcon from "./Common/Icons/dashboard.svg"

const SideNav = ({ user, onLogout }) => {
  const nav = useNavigate();

  return (
    <Container>
      <TopSection>
        <Brand onClick={() => nav("/")}>
          <Logo>📚</Logo>
          <Title>FACIT Journal</Title>
        </Brand>

        <User>
          <img className="avatar" src={user?.profilePicture || AvaterIcon} alt="avatar" />
          <UserInfo>
            <Name>{user?.fullName || "Guest"}</Name>
            <Role>
                {user?.role === "student" && user?.registrationNumber
                  ? ` ${user.registrationNumber}`
                  : user?.role === "officer" && user?.position
                  ? ` ${user.position}`
                  : ""}
            </Role>
            <Role>
                {user?.role || ""}
            </Role>
          </UserInfo>
        </User>

        <NavList>
          <NavItem onClick={() => nav("/")}>
            <Icon src={HomeIcon} alt="Home" /> Home
          </NavItem>
          <NavItem onClick={() => nav("/archive")}>
            <Icon src={ArchiveIcon} alt="Archive" /> Archive
          </NavItem>
          <NavItem onClick={() => nav("/submit-paper")}>
            <Icon src={SubmitIcon} alt="Submit" /> Submit Paper
          </NavItem>
          <NavItem onClick={() => nav("/dashboard")}>
            <Icon src={DashboardIcon} alt="dashboard" /> Paper Review
          </NavItem>
          <NavItem onClick={() => nav("/my-papers")}>
            <Icon src={ApprovalIcon} alt="My Papers" /> My Papers
          </NavItem>
          <NavItem onClick={() => nav("/profile")}>
            <Icon src={ProfileIcon} alt="Profile" /> Profile
          </NavItem>
        </NavList>
      </TopSection>

      <Footer>
        {user ? (
          <LogoutButton onClick={() => { onLogout?.(); nav("/login"); }}>Logout</LogoutButton>
        ) : (
          <LoginButton onClick={() => nav("/login")}>Sign In</LoginButton>
        )}
      </Footer>
    </Container>
  );
};

export default SideNav;