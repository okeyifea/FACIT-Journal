import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../server/API/Auth.js";
import { LoginCard as StyledLoginCard, LoginContainer } from "../Style/LoginCardStyle.jsx";

// component signature accepts setUser
const LoginCard = ({ setUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await loginUser({ username, password });

      if (data.success) {
        // If your backend doesn't return a token yet, we just store user info
        const userWithToken = {
          ...data.user,
          token: data.token || "demo-token" // temporary token for testing
        };
        localStorage.setItem("user", JSON.stringify(userWithToken));
        setUser?.(userWithToken); 
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/sign-up");
  };

  return (
    <StyledLoginCard>
      <LoginContainer>
        <div className="login-head">
          <h2>LOGIN</h2>
          <p>Welcome back to FACIT Journal Platform</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-body">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-body">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <span> 
            <a href="#" onClick={handleForgotPassword}>
              Forgot your password?
            </a> 
          </span>
          <span> 
            Don't have an account? <a href="#" onClick={handleSignUp}>Create</a>
          </span>
        </form>
      </LoginContainer>
    </StyledLoginCard>
  );
};

export default LoginCard;