import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
//import Header from "./Header";

import SideNav from "./SideNav";

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingPicture, setIsUploadingPicture] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    registrationNumber: user?.registrationNumber || "",
    position: user?.position || "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.phone && !/^\d{7,11}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 7-11 digits";
    }

    return newErrors;
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate API call to update profile
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setSuccessMessage("Profile updated successfully!");
    setIsEditing(false);

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handlePictureUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPicture(true);

    // Convert to base64 for demo (in production, upload to server/cloud storage)
    const reader = new FileReader();
    reader.onload = () => {
      const updatedUser = { ...user, profilePicture: reader.result };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSuccessMessage("Profile picture updated successfully!");
      setIsUploadingPicture(false);

      setTimeout(() => setSuccessMessage(""), 3000);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Layout>
      <SideNav user={user} onLogout={handleLogout} />
      <Main>
        <ProfileContainer>
          <ProfileContent>
            {/* Profile Card */}
            <ProfileCard>
              <ProfileHeader>
                <PictureUploadContainer>
                  <ProfilePictureWrapper>
                    <ProfilePicture
                      src={user?.profilePicture || "https://via.placeholder.com/150"}
                      alt="Profile"
                    />
                    <UploadLabel htmlFor="picture-upload">
                      📷
                    </UploadLabel>
                    <PictureInput
                      id="picture-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePictureUpload}
                      disabled={isUploadingPicture}
                    />
                  </ProfilePictureWrapper>
                </PictureUploadContainer>

                <UserInfo>
                  <Username>{user?.username}</Username>
                  <Role>{user?.role}</Role>
                  {user?.position && <Position>{user.position}</Position>}
                </UserInfo>
              </ProfileHeader>

              {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

              {!isEditing ? (
                <>
                  {/* View Mode */}
                  <ProfileSection>
                    <SectionTitle>Personal Information</SectionTitle>
                    <InfoGrid>
                      <InfoItem>
                        <InfoLabel>Full Name</InfoLabel>
                        <InfoValue>{user?.fullName || "Not provided"}</InfoValue>
                      </InfoItem>
                      <InfoItem>
                        <InfoLabel>Email</InfoLabel>
                        <InfoValue>{user?.email || "Not provided"}</InfoValue>
                      </InfoItem>
                      <InfoItem>
                        <InfoLabel>Phone</InfoLabel>
                        <InfoValue>{user?.phone || "Not provided"}</InfoValue>
                      </InfoItem>
                      {user?.registrationNumber && (
                        <InfoItem>
                          <InfoLabel>Registration Number</InfoLabel>
                          <InfoValue>{user.registrationNumber}</InfoValue>
                        </InfoItem>
                      )}
                    </InfoGrid>
                  </ProfileSection>

                  <ButtonGroup>
                    <EditButton onClick={() => setIsEditing(true)}>
                      ✏️ Edit Profile
                    </EditButton>
                    <LogoutButton onClick={handleLogout}>
                      🚪 Logout
                    </LogoutButton>
                  </ButtonGroup>
                </>
              ) : (
                <>
                  {/* Edit Mode */}
                  <form onSubmit={handleSaveProfile}>
                    <ProfileSection>
                      <SectionTitle>Edit Profile</SectionTitle>
                      <FormGrid>
                        <FormGroup>
                          <Label>Full Name *</Label>
                          <Input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            hasError={!!errors.fullName}
                          />
                          {errors.fullName && <ErrorMsg>{errors.fullName}</ErrorMsg>}
                        </FormGroup>

                        <FormGroup>
                          <Label>Email *</Label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            hasError={!!errors.email}
                          />
                          {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
                        </FormGroup>

                        <FormGroup>
                          <Label>Phone</Label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            hasError={!!errors.phone}
                          />
                          {errors.phone && <ErrorMsg>{errors.phone}</ErrorMsg>}
                        </FormGroup>

                        {user?.registrationNumber && (
                          <FormGroup>
                            <Label>Registration Number</Label>
                            <Input
                              type="text"
                              name="registrationNumber"
                              value={formData.registrationNumber}
                              disabled
                            />
                          </FormGroup>
                        )}
                      </FormGrid>
                    </ProfileSection>

                    <ButtonGroup>
                      <SaveButton type="submit">✓ Save Changes</SaveButton>
                      <CancelButton type="button" onClick={() => setIsEditing(false)}>
                        ✕ Cancel
                      </CancelButton>
                    </ButtonGroup>
                  </form>
                </>
              )}
            </ProfileCard>
          </ProfileContent>
        </ProfileContainer>
      </Main>
    </Layout>
  );
};

export default Profile;

// Styled Components
const ProfileContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 100px 20px 40px;
`;

const ProfileContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ProfileCard = styled.div`
  background: rgba(30, 41, 59, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const PictureUploadContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfilePictureWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfilePicture = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #3b82f6;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
`;

const UploadLabel = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  transition: all 0.3s ease;

  &:hover {
    background: #2563eb;
    transform: scale(1.1);
  }
`;

const PictureInput = styled.input`
  display: none;
`;

const UserInfo = styled.div`
  text-align: center;
`;

const Username = styled.h2`
  color: white;
  font-size: 28px;
  margin: 0 0 8px 0;
  font-weight: 800;
`;

const Role = styled.p`
  color: #cbd5e1;
  font-size: 16px;
  margin: 0;
  text-transform: capitalize;
  font-weight: 600;
`;

const Position = styled.p`
  color: #60a5fa;
  font-size: 14px;
  margin: 4px 0 0 0;
  font-weight: 500;
`;

const SuccessMessage = styled.div`
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid #22c55e;
  color: #86efac;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;

const ProfileSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  color: white;
  font-size: 18px;
  margin: 0 0 20px 0;
  font-weight: 700;
  border-bottom: 2px solid #3b82f6;
  padding-bottom: 12px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  background: rgba(15, 23, 42, 0.6);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.1);
`;

const InfoLabel = styled.p`
  color: #94a3b8;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin: 0 0 8px 0;
`;

const InfoValue = styled.p`
  color: #e2e8f0;
  font-size: 16px;
  margin: 0;
  font-weight: 600;
  word-break: break-word;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.span`
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const EditButton = styled.button`
  flex: 1;
  height: 44px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6);
  }
`;

const LogoutButton = styled(EditButton)`
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);

  &:hover {
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.6);
  }
`;

const SaveButton = styled(EditButton)``;

const CancelButton = styled(EditButton)`
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  box-shadow: 0 6px 20px rgba(107, 114, 128, 0.4);

  &:hover {
    box-shadow: 0 8px 25px rgba(107, 114, 128, 0.6);
  }
`;

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;