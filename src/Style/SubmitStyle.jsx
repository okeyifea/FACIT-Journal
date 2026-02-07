import styled from "styled-components";

export const Main = styled.main``;

export const SubmitContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 30px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

export const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 50px;

  h1 {
    font-size: 42px;
    font-weight: 800;
    color: white;
    margin: 0 0 15px 0;
    letter-spacing: 1px;
  }

  p {
    font-size: 16px;
    color: #cbd5e1;
    margin: 0;
    letter-spacing: 0.5px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 32px;
    }

    p {
      font-size: 14px;
    }
  }
`;

export const FormWrapper = styled.div`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.8) 100%);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  padding: 40px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);

  @media (max-width: 768px) {
    padding: 25px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  color: white;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const Input = styled.input`
  padding: 12px 15px;
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 14px;
  transition: all 0.3s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.1);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:hover {
    border-color: #667eea;
  }
`;

export const Select = styled.select`
  padding: 12px 15px;
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;

  option {
    background: #1e293b;
    color: white;
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.1);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:hover {
    border-color: #667eea;
  }
`;

export const TextArea = styled.textarea`
  padding: 12px 15px;
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.1);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:hover {
    border-color: #667eea;
  }
`;

export const FileInput = styled.input`
  padding: 12px 15px;
  border: 2px dashed rgba(102, 126, 234, 0.5);
  border-radius: 8px;
  background: rgba(102, 126, 234, 0.05);
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

export const FileHelp = styled.small`
  color: #94a3b8;
  font-size: 12px;
  margin-top: 8px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #cbd5e1;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #667eea;
  }

  span {
    line-height: 1.5;
  }

  &:hover {
    color: white;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 35px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 14px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ResetButton = styled.button`
  flex: 1;
  padding: 14px 30px;
  background: transparent;
  color: white;
  border: 2px solid rgba(102, 126, 234, 0.5);
  border-radius: 8px;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
