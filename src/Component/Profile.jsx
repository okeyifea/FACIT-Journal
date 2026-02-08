import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
import ProfileIcon from "./Common/Icons/profile-user.svg"

import Layout from "./Common/layout";
import SideNav from "./SideNav";
import { API_URL } from "../../server/API/Auth.js";
import { useToast } from "./Common/Toast.jsx";

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordError, setPasswordError] = useState("");

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    username: user?.username || "",
    phone: user?.phone || ""
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  /* -------------------- HELPERS -------------------- */

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    addToast(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  /* -------------------- PROFILE -------------------- */

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateProfile = () => {
    const err = {};
    if (!formData.fullName.trim()) err.fullName = "Full name is required";
    if (!formData.email.trim()) err.email = "Email is required";
    if (!formData.username.trim()) err.username = "Username is required"
    return err;
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    const err = validateProfile();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    const updatedUser = { ...user, ...formData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    setIsEditing(false);
    showSuccess("Profile updated successfully");
  };

  /* -------------------- PASSWORD -------------------- */

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setPasswordError("");
  };

  const handleUpdatePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      const res = await fetch(`${API_URL}/api/auth/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      console.log("Token from localStorage:", token);

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

      setShowPasswordForm(false);
      showSuccess("Password updated successfully");
    } catch (err) {
      setPasswordError(err.message || "Failed to update password");
    }
  };

  /* -------------------- PICTURE -------------------- */

  const handlePictureUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const updatedUser = { ...user, profilePicture: reader.result };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      showSuccess("Profile picture updated");
    };
    reader.readAsDataURL(file);
  };

  /* -------------------- UI -------------------- */

  return (
    <Layout>
      <SideNav user={user} onLogout={handleLogout} />

      <Main>
        <ProfileContainer>
          <ProfileContent>
            <ProfileCard>
              <ProfileHeader>
                <PictureUploadContainer>
                  <ProfilePictureWrapper>
                    <ProfilePicture
                      src={user?.profilePicture || ProfileIcon}
                    />
                    <UploadLabel htmlFor="upload">📷</UploadLabel>
                    <PictureInput
                      id="upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePictureUpload}
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
                  <ProfileSection>
                    <SectionTitle>Personal Information</SectionTitle>
                    <InfoGrid>
                      <InfoItem>
                        <InfoLabel>Full Name</InfoLabel>
                        <InfoValue>{user?.fullName}</InfoValue>
                      </InfoItem>
                      <InfoItem>
                        <InfoLabel>Email</InfoLabel>
                        <InfoValue>{user?.email}</InfoValue>
                      </InfoItem>
                      <InfoItem>
                        <InfoLabel>Username</InfoLabel>
                        <InfoValue>{user?.username}</InfoValue>
                      </InfoItem>
                      <InfoItem>
                        <InfoLabel>Phone</InfoLabel>
                        <InfoValue>{user?.phone || "—"}</InfoValue>
                      </InfoItem>
                    </InfoGrid>
                  </ProfileSection>

                  <ButtonGroup>
                    <EditButton onClick={() => setIsEditing(true)}>✏️ Edit</EditButton>
                    <LogoutButton onClick={() => setShowPasswordForm(true)}>
                      🔒 Update Password
                    </LogoutButton>
                  </ButtonGroup>
                </>
              ) : (
                <form onSubmit={handleSaveProfile}>
                  <ProfileSection>
                    <SectionTitle>Edit Profile</SectionTitle>
                    <FormGrid>
                      <FormGroup>
                        <Label>Full Name</Label>
                        <Input name="fullName" value={formData.fullName} onChange={handleProfileChange} />
                        {errors.fullName && <ErrorMsg>{errors.fullName}</ErrorMsg>}
                      </FormGroup>

                      <FormGroup>
                        <Label>Email</Label>
                        <Input name="email" value={formData.email} onChange={handleProfileChange} />
                        {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
                      </FormGroup>

                      <FormGroup>
                        <Label>Username</Label>
                        <Input name="username" value={formData.username} onChange={handleProfileChange} />
                        {errors.username && <ErrorMsg>{errors.username}</ErrorMsg>}
                      </FormGroup>

                      <FormGroup>
                        <Label>Phone</Label>
                        <Input name="phone" value={formData.phone} onChange={handleProfileChange} />
                      </FormGroup>
                    </FormGrid>
                  </ProfileSection>

                  <ButtonGroup>
                    <SaveButton type="submit">✓ Save</SaveButton>
                    <CancelButton type="button" onClick={() => setIsEditing(false)}>
                      ✕ Cancel
                    </CancelButton>
                  </ButtonGroup>
                </form>
              )}

              {showPasswordForm && (
                <ProfileSection>
                  <SectionTitle>Update Password</SectionTitle>
                  <FormGrid>
                    <FormGroup>
                      <Label>Current Password</Label>
                      <Input type="password" name="currentPassword" onChange={handlePasswordChange} />
                    </FormGroup>
                    <FormGroup>
                      <Label>New Password</Label>
                      <Input type="password" name="newPassword" onChange={handlePasswordChange} />
                    </FormGroup>
                    <FormGroup>
                      <Label>Confirm Password</Label>
                      <Input type="password" name="confirmPassword" onChange={handlePasswordChange} />
                    </FormGroup>
                  </FormGrid>

                  {passwordError && <ErrorMsg>{passwordError}</ErrorMsg>}

                  <ButtonGroup>
                    <SaveButton onClick={handleUpdatePassword}>✓ Update</SaveButton>
                    <CancelButton onClick={() => setShowPasswordForm(false)}>✕ Cancel</CancelButton>
                  </ButtonGroup>
                </ProfileSection>
              )}
            </ProfileCard>
          </ProfileContent>
        </ProfileContainer>
      </Main>
    </Layout>
  );
};

export default Profile;
