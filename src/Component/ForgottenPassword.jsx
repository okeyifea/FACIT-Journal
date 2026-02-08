import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { API_URL } from "../../server/API/Auth";

const ForgottenPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");


  const handleReset = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    if (!res.ok) {
      throw new Error("Request failed");
    }

    setSubmitted(true);

    setTimeout(() => {
      navigate("/login");
    }, 3000);

  } catch (err) {
    console.error(err);
    alert("Unable to send reset link");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <ForgottenPasswordWrapper>
      <ForgottenPasswordContainer>
        {!submitted ? (
          <>
            <HeaderSection>
              <h1>Reset Password</h1>
              <p>Enter your email address and we'll send you a link to reset your password</p>
            </HeaderSection>

            <form onSubmit={handleReset}>
              <FormGroup>
                <Label>Email Address *</Label>
                <Input
                  type="email"
                  placeholder="Enter your registered email"
                  required
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Link"}
              </SubmitButton>

              <BackLink onClick={() => navigate("/login")}>
                ← Back to Login
              </BackLink>
            </form>
          </>
        ) : (
          <SuccessMessage>
            <SuccessIcon>✓</SuccessIcon>
            <h2>Check Your Email</h2>
            <p>We've sent a password reset link to your email address.</p>
            <SmallText>Please check your inbox and follow the link to reset your password.</SmallText>
            <SmallText secondary>Redirecting to login page in a few seconds...</SmallText>
          </SuccessMessage>
        )}
      </ForgottenPasswordContainer>
    </ForgottenPasswordWrapper>
  );
};

export default ForgottenPassword;

const ForgottenPasswordWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;

const ForgottenPasswordContainer = styled.div`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.9) 100%);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 16px;
  padding: 50px 40px;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.2);
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 450px;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 32px;
    font-weight: 800;
    color: white;
    margin: 0 0 12px 0;
    letter-spacing: 1px;
  }

  p {
    font-size: 14px;
    color: #cbd5e1;
    margin: 0;
    line-height: 1.6;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 25px;
`;

const Label = styled.label`
  color: white;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  height: 48px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid rgba(102, 126, 234, 0.3);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 14px;
  transition: all 0.3s ease;
  font-family: inherit;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.1);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:hover:not(:disabled) {
    border-color: #667eea;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  margin-top: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

const BackLink = styled.button`
  background: none;
  border: none;
  color: #7dd3fc;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: #667eea;
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 20px;
`;

const SuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 32px;
  color: white;
  font-weight: bold;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
`;

const SmallText = styled.p`
  color: ${props => props.secondary ? '#94a3b8' : '#cbd5e1'};
  font-size: 14px;
  line-height: 1.6;
  margin: 12px 0;

  &:first-of-type {
    margin-top: 20px;
  }
`;