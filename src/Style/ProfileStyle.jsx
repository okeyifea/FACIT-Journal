import styled from "styled-components";

export const Main = styled.main`
`;

export const ProfileContainer = styled.div`
  min-height: 100vh;
  padding: 50px 20px 40px;

  @media (max-width: 900px) {
    padding: 36px 16px 32px;
  }

  @media (max-width: 640px) {
    padding: 28px 12px 24px;
  }

  @media (max-width: 480px) {
    padding: 22px 10px 20px;
  }
`;

export const ProfileContent = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 980px;

  @media (max-width: 900px) {
    max-width: 820px;
  }

  @media (max-width: 640px) {
    max-width: 100%;
  }
`;

export const ProfileCard = styled.div`
  background: rgba(30, 41, 59, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);

  @media (max-width: 900px) {
    padding: 32px;
  }

  @media (max-width: 640px) {
    padding: 24px 18px;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 20px 14px;
  }
`;

export const ProfileHeader = styled.div`
  height: 300px;
  text-align: center;
  padding-top: 20px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-width: 900px) {
    height: 260px;
    margin-bottom: 24px;
  }

  @media (max-width: 640px) {
    height: auto;
    padding-top: 8px;
    margin-bottom: 20px;
    gap: 14px;
  }
`;

export const PictureUploadContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ProfilePictureWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 150px;
  height: 150px;

  @media (max-width: 640px) {
    width: 120px;
    height: 120px;
  }

  @media (max-width: 480px) {
    width: 104px;
    height: 104px;
  }
`;

export const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #3b82f6;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);

  @media (max-width: 640px) {
    width: 120px;
    height: 120px;
    border-width: 3px;
  }

  @media (max-width: 480px) {
    width: 104px;
    height: 104px;
  }
`;

export const UploadLabel = styled.label`
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

  @media (max-width: 640px) {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }
`;

export const PictureInput = styled.input`
  display: none;
`;

export const UserInfo = styled.div`
  text-align: center;
`;

export const Username = styled.h2`
  color: white;
  font-size: 28px;
  margin: 0 0 8px 0;
  font-weight: 800;

  @media (max-width: 640px) {
    font-size: 22px;
  }
`;

export const Role = styled.p`
  color: #cbd5e1;
  font-size: 16px;
  margin: 0;
  text-transform: capitalize;
  font-weight: 600;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

export const Position = styled.p`
  color: #60a5fa;
  font-size: 14px;
  margin: 4px 0 0 0;
  font-weight: 500;

  @media (max-width: 640px) {
    font-size: 13px;
  }
`;

export const SuccessMessage = styled.div`
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid #22c55e;
  color: #86efac;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;

  @media (max-width: 640px) {
    font-size: 13px;
    padding: 10px 12px;
  }
`;

export const ProfileSection = styled.div`
  margin: 30px 0 40px 0;

  @media (max-width: 640px) {
    margin: 22px 0 28px 0;
  }
`;

export const SectionTitle = styled.h3`
  color: white;
  font-size: 18px;
  margin: 0 0 20px 0;
  font-weight: 700;
  border-bottom: 2px solid #3b82f6;
  padding-bottom: 12px;

  @media (max-width: 640px) {
    font-size: 16px;
    margin-bottom: 16px;
    padding-bottom: 10px;
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoItem = styled.div`
  background: rgba(15, 23, 42, 0.6);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.1);

  @media (max-width: 640px) {
    padding: 14px;
  }
`;

export const InfoLabel = styled.p`
  color: #94a3b8;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin: 0 0 8px 0;

  @media (max-width: 640px) {
    font-size: 11px;
  }
`;

export const InfoValue = styled.p`
  color: #e2e8f0;
  font-size: 16px;
  margin: 0;
  font-weight: 600;
  word-break: break-word;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: #e2e8f0;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 640px) {
    font-size: 11px;
  }
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    height: 42px;
    font-size: 13px;
  }
`;

export const ErrorMsg = styled.span`
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const EditButton = styled.button`
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

  @media (max-width: 640px) {
    height: 42px;
    font-size: 14px;
  }
`;

export const LogoutButton = styled(EditButton)`
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);

  &:hover {
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.6);
  }
`;

export const SaveButton = styled(EditButton)``;

export const CancelButton = styled(EditButton)`
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  box-shadow: 0 6px 20px rgba(107, 114, 128, 0.4);

  &:hover {
    box-shadow: 0 8px 25px rgba(107, 114, 128, 0.6);
  }
`;
