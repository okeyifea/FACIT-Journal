import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../server/API/Auth.js";
import { LoginCard as StyledLoginCard, LoginContainer } from "../Style/LoginCardStyle.jsx";
import { useToast } from "./Common/Toast.jsx";
import Modal from "./Common/Modal.jsx";

// component signature accepts setUser
const LoginCard = ({ setUser }) => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, title: "", message: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await loginUser({ username, password });

      if (data.success) {
        const userWithToken = {
          ...data.user,
          token: data.token 
        };
        localStorage.setItem("user", JSON.stringify(userWithToken));
        localStorage.setItem("token", data.token);
        setUser(userWithToken);

        // Navigate to dashboard
        addToast(`Welcome Back ${username}`);
        navigate("/");
      } else {
        setError(data.message || "Invalid username or password");
        setModal({
          open: true,
          title: "Login Failed",
          message: data.message || "Invalid username or password"
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
      setModal({
        open: true,
        title: "Login Failed",
        message: "Network error. Please try again."
      });
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

        {error && <p style={{ color: "red" }}>{error}</p>}
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
        <Modal
          open={modal.open}
          title={modal.title}
          message={modal.message}
          onClose={() => setModal({ open: false, title: "", message: "" })}
        />
      </LoginContainer>
    </StyledLoginCard>
  );
};

export default LoginCard;
