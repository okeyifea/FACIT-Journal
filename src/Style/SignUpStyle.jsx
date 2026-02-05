import React from "react";
import styled from "styled-components";

// Styled Components
export const SignUpPage = styled.div`
  display: flex;
  height: 100vh;        
  overflow: hidden;     
  margin: 0;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  overflow-y: auto;       
  max-height: 100vh;     

  @media (max-width: 768px) {
    display: none;
  }
`;

export const BrandContainer = styled.div``;

export const BrandSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

export const BrandLogo = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

export const BrandTitle = styled.h1`
  font-size: 36px;
  font-weight: 800;
  margin: 0 0 10px 0;
  letter-spacing: 2px;
`;

export const BrandSubtitle = styled.p`
  font-size: 16px;
  color: #000408;
  margin: 0;
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 16px;
`;

export const FeatureIcon = styled.span`
  font-size: 24px;
  color: #22c55e;
  font-weight: bold;
`;

export const FeatureText = styled.span`
  color: #000203;
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;

  @media (max-width: 1024px) {
    min-height: 100vh;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: auto;
  background: rgba(30, 41, 59, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 16px;
  padding: 50px 40px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);

  @media (max-width: 600px) {
    padding: 30px 20px;
    border-radius: 12px;
  }
`;

export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const FormTitle = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: white;
  margin: 0 0 8px 0;
  letter-spacing: 0.5px;
`;

export const FormSubtitle = styled.p`
  font-size: 14px;
  color: #cbd5e1;
  margin: 0;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  grid-column: ${(props) => (props.fullWidth ? "1 / -1" : "auto")};
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: #e2e8f0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  height: 44px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.hasError ? "#ef4444" : "rgba(148, 163, 184, 0.2)")};
  background: rgba(15, 23, 42, 0.6);
  color: white;
  font-size: 14px;
  transition: all 0.3s ease;
  font-family: inherit;

  &::placeholder {
    color: #64748b;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: rgba(59, 130, 246, 0.1);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:hover:not(:focus) {
    border-color: rgba(148, 163, 184, 0.3);
  }
`;

export const PasswordInput = styled(Input)``;

export const Select = styled.select`
  height: 44px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.hasError ? "#ef4444" : "rgba(148, 163, 184, 0.2)")};
  background: rgba(15, 23, 42, 0.6);
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  option {
    background: #1e293b;
    color: white;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: rgba(59, 130, 246, 0.1);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:hover:not(:focus) {
    border-color: rgba(148, 163, 184, 0.3);
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 24px;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin-top: 4px;
  cursor: pointer;
  accent-color: #3b82f6;
`;

export const CheckboxLabel = styled.label`
  font-size: 13px;
  color: #cbd5e1;
  cursor: pointer;
  line-height: 1.5;
`;

export const TermsLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #60a5fa;
    text-decoration: underline;
  }
`;

export const ErrorMsg = styled.span`
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 44px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6);
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

export const Spinner = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoginPrompt = styled.p`
  text-align: center;
  color: #cbd5e1;
  font-size: 13px;
  margin-top: 20px;
`;

export const LoginLink = styled.span`
  color: #3b82f6;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #60a5fa;
  }
`;