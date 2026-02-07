import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import styled from "styled-components";
//import Header from "./Header";

import {
  Main,
  ProfileContainer,
  ProfileContent,
  ProfileCard,
  ProfileHeader,
  PictureUploadContainer,
  ProfilePictureWrapper,
  ProfilePicture,
  UploadLabel,
  PictureInput,
  UserInfo,
  Username,
  Role,
  Position,
  SuccessMessage,
  ProfileSection,
  SectionTitle,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  ButtonGroup,
  EditButton,
  LogoutButton,
  FormGrid,
  FormGroup,
  Label,
  Input,
  ErrorMsg,
  SaveButton,
  CancelButton
} from "../Style/ProfileStyle.jsx";

import Layout from "./Common/layout";
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