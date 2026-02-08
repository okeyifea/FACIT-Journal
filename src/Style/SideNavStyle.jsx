import React from "react";
import styled from "styled-components";

export const Container = styled.aside`
  width: 270px;
  min-width: 220px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 12px;
  border-right: 1px solid rgba(0,0,0,0.05);
  background: #f8f9fa;
  position: fixed;
  left: 0;
  top: 0;
    z-index: 100;

  @media (max-width: 900px) {
    width: 220px;
    min-width: 200px;
  }

  @media (max-width: 640px) {
    position: fixed;
    width: 100%;
    height: auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-right: none;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    padding: 10px 12px;
  }
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-right: 4px;

  @media (max-width: 640px) {
    flex-direction: row;
    align-items: center;
    gap: 8px;
    padding-right: 0;
    overflow-y: visible;
    overflow-x: auto;
    flex: 1;
  }
`;

// Brand
export const Brand = styled.div`
  display:flex;
  align-items:center;
  gap:8px;
  cursor:pointer;
  margin-bottom:12px;
  padding: 6px;
  border-radius: 6px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  @media (max-width: 640px) {
    margin-bottom: 0;
    flex-shrink: 0;
  }
`;

export const Logo = styled.div`font-size:24px;`;
export const Title = styled.h3`margin:0;font-size:16px;font-weight:800;letter-spacing:0.6px;color:white;`;

// User
export const User = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  width:100%;
  height:auto;
  min-height: 200px;
  padding:12px 0;
  border-bottom:1px solid rgba(0,0,0,0.1);
  margin-bottom:12px;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius:12px;
    object-fit:cover;
    border:2px solid rgba(0,0,0,0.1);
    margin-bottom: 6px;
  }

  @media (max-width: 900px) {
    min-height: 170px;

    .avatar {
      width: 84px;
      height: 84px;
    }
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

export const UserInfo = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
text-align:center;
gap:4px;
margin-top: 10px;
`;

export const Name = styled.div`
text-align:center;
line-height:1.2;`;

export const Role = styled.div`
color:#555;
margin-top:2px;
text-transform:capitalize;
text-align:center;`;

// Navigation
export const NavList = styled.nav`
  display:flex;
  flex-direction:column;
  gap:10px;

  @media (max-width: 640px) {
    flex-direction: row;
    align-items: center;
    gap: 8px;
    padding: 0 6px;
    overflow-x: auto;
    scrollbar-width: thin;
  }
`;

export const NavItem = styled.button`
  display:flex;
  align-items:center;
  height:40px;
  width:100%;
  gap:8px;
  text-align:left;
  background: transparent;
  border:none;
  color:inherit;
  padding:8px 12px;
  border-radius:6px;
  font-weight:600;
  cursor:pointer;
  transition: background 0.15s, transform 0.08s;

  &:hover,
  &:active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 640px) {
    height: 36px;
    width: auto;
    padding: 6px 10px;
    font-size: 13px;
    white-space: nowrap;
  }
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;

  @media (max-width: 640px) {
    width: 18px;
    height: 18px;
  }
`;

// Footer
export const Footer = styled.div`
  padding-top:8px;
  border-top:1px solid rgba(0,0,0,0.05);

  @media (max-width: 640px) {
    padding-top: 0;
    border-top: none;
    flex-shrink: 0;
  }
`;

export const LoginButton = styled.button`
  width:100%;
  height: 50px;
  padding:8px;
  margin-bottom: 50px;
  border-radius:6px;
  border:none;
  background: linear-gradient(90deg,#ef4444,#dc2626);
  color:white;
  font-weight:700;
  cursor:pointer;

  @media (max-width: 640px) {
    width: auto;
    height: 36px;
    margin-bottom: 0;
    padding: 6px 12px;
    font-size: 13px;
    border-radius: 8px;
  }
`;

export const LogoutButton = styled.button`
  width:100%;
  height: 50px;
  padding:8px;
  margin-bottom: 50px;
  border-radius:6px;
  border:none;
  cursor:pointer;
  background: red;
  color: white;

  @media (max-width: 640px) {
    width: auto;
    height: 36px;
    margin-bottom: 0;
    padding: 6px 12px;
    font-size: 13px;
    border-radius: 8px;
  }
`;
