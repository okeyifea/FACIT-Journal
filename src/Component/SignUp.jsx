import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  SignUpPage,
  LeftSection,
  BrandContainer,
  BrandSection,
  BrandLogo,
  BrandTitle,
  BrandSubtitle,
  FeatureList,
  FeatureItem,
  FeatureIcon,
  FeatureText,
  RightSection,
  FormContainer,
  FormHeader,
  FormTitle,
  FormSubtitle,
  FormGrid,
  FormGroup,
  Label,
  Input,
  PasswordInput,
  Select,
  CheckboxContainer,
  Checkbox,
  CheckboxLabel,
  TermsLink,
  SubmitButton,
  LoginPrompt,
  LoginLink,
  ErrorMsg,
  Spinner,
} from "../Style/SignUpStyle.jsx"
import { signupUser } from "../../server/API/Auth.js";

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
    role: "",
    position: "", // For officer sub-role
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.username.trim()) newErrors.username = "Username is required";
    else if (formData.username.length < 3)
      newErrors.username = "Username must be at least 3 characters";

    if (!formData.role) newErrors.role = "Role is required";

    if (formData.role === "student" && !formData.registrationNumber.trim())
      newErrors.registrationNumber = "Registration number is required for students";

    if (formData.role === "officer" && !formData.position)
      newErrors.position = "Position is required for officers";

    if (formData.phone && !/^\d{7,11}$/.test(formData.phone))
      newErrors.phone = "Phone must be 7-11 digits";

    if (!formData.password) newErrors.password = "Password is required";
    else if (
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/.test(
        formData.password
      )
    )
      newErrors.password =
        "8-16 chars, 1 uppercase, 1 special character required";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!agreeTerms) newErrors.terms = "You must agree to the terms";

    return newErrors;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    const payload = {
      username: formData.username,
     password: formData.password,
     role: formData.role, // Use raw role from dropdown
     fullName: formData.fullName,
     email: formData.email,
     phone: formData.phone,
    };
    if (formData.role === "student") {payload.registrationNumber = formData.registrationNumber;}
    if (formData.role === "officer") {payload.position = formData.position;}

    console.log("sent payload:", payload);
    const data = await signupUser(payload);
    if (data.success) {
      navigate("/login");
    } else {
      setErrors({ general: data.message });
    }

    setIsLoading(false);
  };

  return (
    <SignUpPage>
      <LeftSection>
        <BrandContainer>
        <BrandSection>
          <BrandLogo>📚</BrandLogo>
          <BrandTitle>FACIT Journal</BrandTitle>
          <BrandSubtitle>Academic Excellence Platform</BrandSubtitle>
        </BrandSection>
        <FeatureList>
          <FeatureItem>
            <FeatureIcon>✓</FeatureIcon>
            <FeatureText>Publish academic research</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>✓</FeatureIcon>
            <FeatureText>Share research with researchers</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>✓</FeatureIcon>
            <FeatureText>Review academic work</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>✓</FeatureIcon>
            <FeatureText>Track citations</FeatureText>
          </FeatureItem>
        </FeatureList>
        </BrandContainer>
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

              <FormGroup>
                <Label>Role *</Label>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  hasError={!!errors.role}
                >
                  <option value="" disabled hidden>Select Role</option>
                  <option value="student">Student</option>
                  <option value="staff">Staff</option>
                  <option value="officer">Officer</option>
                </Select>
                {errors.role && <ErrorMsg>{errors.role}</ErrorMsg>}
              </FormGroup>

              {formData.role === "officer" && (
                <FormGroup>
                  <Label>Position *</Label>
                  <Select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    hasError={!!errors.position}
                  >
                    <option value="" disabled hidden>Select Position</option>
                    <option value="HOD">HOD</option>
                    <option value="Dean">Dean</option>
                  </Select>
                  {errors.position && <ErrorMsg>{errors.position}</ErrorMsg>}
                </FormGroup>
              )}

              {formData.role === "student" && (
                <FormGroup fullWidth>
                  <Label>Registration Number *</Label>
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
              )}

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
