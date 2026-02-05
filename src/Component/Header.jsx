import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout?.();
    navigate("/login");
  };

  return (
    <StyledHeader>
      <Logo onClick={() => navigate("/")}>
        <span>📚</span>
        <h2>FCIT JOURNAL</h2>
      </Logo>

      <NavLinks>
        <span><a href="/">HOME</a></span>
        <span><a href="/archive">ARCHIVE</a></span>
        <span><a href="/submit-paper">SUBMIT PAPER</a></span>

        {user ? (
          <UserMenu>
            <UserButton onClick={() => setShowDropdown(!showDropdown)}>
              <Avatar src={user.profilePicture || "https://via.placeholder.com/40"} alt="Profile" />
              <span>{user.username}</span>
              <DropdownIcon>▼</DropdownIcon>
            </UserButton>

            {showDropdown && (
              <DropdownMenu>
                <DropdownItem onClick={() => { navigate("/profile"); setShowDropdown(false); }}>
                  👤 Profile
                </DropdownItem>
                <DropdownItem onClick={handleLogout}>
                  🚪 Logout
                </DropdownItem>
              </DropdownMenu>
            )}
          </UserMenu>
        ) : (
          <span><a href="/login">SIGN IN</a></span>
        )}
      </NavLinks>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 75px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0 30px;
  z-index: 1000;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  span {
    font-size: 32px;
  }

  h2 {
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 1px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  margin-left: auto;

  span a {
    color: white;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.5px;
    position: relative;
    padding: 8px 12px;
    border-radius: 6px;
    transition: all 0.3s ease;

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 2px;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);

      &::before {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.5);
`;

const DropdownIcon = styled.span`
  font-size: 10px;
  margin-left: 4px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  min-width: 160px;
  margin-top: 8px;
  overflow: hidden;
  animation: slideDown 0.3s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 14px;

  &:hover {
    background: #f5f5f5;
    color: #667eea;
  }

  &:first-child {
    border-bottom: 1px solid #eee;
  }
`;

export default Header;