import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    phone: "",
    registrationNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (formData.phone && !/^\d{7,11}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 7-11 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/.test(formData.password)) {
      newErrors.password = "8-16 chars, 1 uppercase, 1 special character required";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeTerms) {
      newErrors.terms = "You must agree to the terms";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  return (
    <SignUpPage>
      <LeftSection>
        <BrandSection>
          <BrandLogo>📚</BrandLogo>
          <BrandTitle>FACIT Journal</BrandTitle>
          <BrandSubtitle>Academic Excellence Platform</BrandSubtitle>
        </BrandSection>
        <FeatureList>
          <FeatureItem>
            <FeatureIcon>✓</FeatureIcon>
            <FeatureText>Publish and share research</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>✓</FeatureIcon>
            <FeatureText>Connect with researchers</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>✓</FeatureIcon>
            <FeatureText>Get peer reviews</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>✓</FeatureIcon>
            <FeatureText>Track citations</FeatureText>
          </FeatureItem>
        </FeatureList>
      </LeftSection>

      <RightSection>
        <FormContainer>
          <FormHeader>
            <FormTitle>Create Account</FormTitle>
            <FormSubtitle>Join our academic community</FormSubtitle>
          </FormHeader>

          <form onSubmit={handleSubmit}>
            <FormGrid>
              <FormGroup>
                <Label>Full Name *</Label>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  hasError={!!errors.fullName}
                />
                {errors.fullName && <ErrorMsg>{errors.fullName}</ErrorMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Email Address *</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  hasError={!!errors.email}
                />
                {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Username *</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleChange}
                  hasError={!!errors.username}
                />
                {errors.username && <ErrorMsg>{errors.username}</ErrorMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="1234567890"
                  maxLength="11"
                  value={formData.phone}
                  onChange={handleChange}
                  hasError={!!errors.phone}
                />
                {errors.phone && <ErrorMsg>{errors.phone}</ErrorMsg>}
              </FormGroup>

              <FormGroup fullWidth>
                <Label>Registration Number</Label>
                <Input
                  type="text"
                  name="registrationNumber"
                  placeholder="e.g., GOU/UCC/CSC/839"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  hasError={!!errors.registrationNumber}
                />
                {errors.registrationNumber && <ErrorMsg>{errors.registrationNumber}</ErrorMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Password *</Label>
                <PasswordInput
                  type="password"
                  name="password"
                  placeholder="Min 8 chars, 1 uppercase, 1 special"
                  value={formData.password}
                  onChange={handleChange}
                  hasError={!!errors.password}
                />
                {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
              </FormGroup>

              <FormGroup>
                <Label>Confirm Password *</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  hasError={!!errors.confirmPassword}
                />
                {errors.confirmPassword && <ErrorMsg>{errors.confirmPassword}</ErrorMsg>}
              </FormGroup>
            </FormGrid>

            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <CheckboxLabel htmlFor="terms">
                I agree to the <TermsLink href="#terms">Terms of Service</TermsLink> and{" "}
                <TermsLink href="#privacy">Privacy Policy</TermsLink>
              </CheckboxLabel>
            </CheckboxContainer>
            {errors.terms && <ErrorMsg>{errors.terms}</ErrorMsg>}

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner /> Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </SubmitButton>
          </form>

          <LoginPrompt>
            Already have an account?{" "}
            <LoginLink onClick={() => navigate("/login")}>Sign In</LoginLink>
          </LoginPrompt>
        </FormContainer>
      </RightSection>
    </SignUpPage>
  );
};

export default SignUp;

// Styled Components
const SignUpPage = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  overflow: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 40px;
  color: white;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%);

  @media (max-width: 1024px) {
    padding: 40px 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const BrandSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const BrandLogo = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

const BrandTitle = styled.h1`
  font-size: 36px;
  font-weight: 800;
  margin: 0 0 10px 0;
  letter-spacing: 2px;
`;

const BrandSubtitle = styled.p`
  font-size: 16px;
  color: #cbd5e1;
  margin: 0;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 16px;
`;

const FeatureIcon = styled.span`
  font-size: 24px;
  color: #22c55e;
  font-weight: bold;
`;

const FeatureText = styled.span`
  color: #cbd5e1;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;

  @media (max-width: 1024px) {
    min-height: 100vh;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
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

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const FormTitle = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: white;
  margin: 0 0 8px 0;
  letter-spacing: 0.5px;
`;

const FormSubtitle = styled.p`
  font-size: 14px;
  color: #cbd5e1;
  margin: 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  grid-column: ${(props) => (props.fullWidth ? "1 / -1" : "auto")};
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: #e2e8f0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
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

const PasswordInput = styled(Input)``;

const Select = styled.select`
  height: 44px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.2);
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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 24px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin-top: 4px;
  cursor: pointer;
  accent-color: #3b82f6;
`;

const CheckboxLabel = styled.label`
  font-size: 13px;
  color: #cbd5e1;
  cursor: pointer;
  line-height: 1.5;
`;

const TermsLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #60a5fa;
    text-decoration: underline;
  }
`;

const ErrorMsg = styled.span`
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
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

const Spinner = styled.span`
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

const LoginPrompt = styled.p`
  text-align: center;
  color: #cbd5e1;
  font-size: 13px;
  margin-top: 20px;
`;

const LoginLink = styled.span`
  color: #3b82f6;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #60a5fa;
  }
`;