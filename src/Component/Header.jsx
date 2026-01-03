import React from "react";
import styled from "styled-components";

const Header = () => {
    return (
        <StyledHeader>
            <img src="/path/to/logo.png" alt="Logo" />
            <h2> FCIT JOURNAL PLATFORM</h2>
            <div className="nav-links">
                <span><a  href="/">HOME</a></span>
                <span><a href="/archive">ARCHIVE</a></span>
                <span><a href="/submit-paper">SUBMIT PAPER</a></span>
                <span><a href="/login">SIGN IN</a></span>
            </div>
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

    img {
        height: 50px;
        width: auto;
        object-fit: contain;
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.08);
        }
    }

    h2 {
        margin: 0;
        font-size: 26px;
        font-weight: 700;
        letter-spacing: 1.5px;
        flex: 1;
        text-align: center;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .nav-links {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-left: auto;
        margin-right: 4%;

        span {
            a {
                color: white;
                text-decoration: none;
                font-weight: 600;
                font-size: 15px;
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

                &:active {
                    transform: translateY(0);
                }
            }
        }
    }
`;

export default Header;