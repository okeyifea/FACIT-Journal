import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginCard as StyledLoginCard, LoginContainer } from "../Style/LoginCardStyle";

const LoginCard = () => {
  const navigate = useNavigate();

  const HandleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  }

  const HandleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  const HandleSignUp = (e) => {
    e.preventDefault();
    navigate("/sign-up");
  };

  return (
    <StyledLoginCard>
      <LoginContainer>
        <div className="login-head">
          <h2>LOGIN</h2>
          <p>Welcome back to FCIT Journal Platform</p>
        </div>
        <form >
          <div className="form-body">
            <p>Email or Username</p>
            <input 
              type="text" 
              placeholder="Enter your email or username" 
              required
            />
          </div>
          <div className="form-body">
            <p>Password</p>
            <input 
              type="password" 
              placeholder="Enter your password" 
              required
            />
          </div>
          <button type="submit" onClick={HandleSubmit}>
            Login
          </button>
          <span>
            <a href="" onClick={HandleForgotPassword}>Forgot your password?</a>
          </span>
          <span>
            Don't have an account? <a href="" onClick={HandleSignUp}>Create one</a>
          </span>
        </form>
      </LoginContainer>
    </StyledLoginCard>
  );
};

export default LoginCard;