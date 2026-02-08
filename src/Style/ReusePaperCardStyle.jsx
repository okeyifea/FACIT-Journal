import styled from "styled-components";

export const Card = styled.div`
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.85) 0%,
    rgba(51, 65, 85, 0.85) 100%
  );
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-left: 4px solid #667eea;
  border-radius: 12px;
  padding: 24px;
  margin: 16px 0;
  backdrop-filter: blur(10px);
  transition: all 0.35s ease;
  overflow: hidden;

  &:hover {
    border-left-color: #764ba2;
    transform: translateY(-4px);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.3);
    border-color: rgba(102, 126, 234, 0.4);
  }
`;

export const Title = styled.h3`
  font-size: 30px;
  font-weight: 700;
  margin: 0 0 10px;
  color: white;
  line-height: 1.4;
  text-align: center;
  text-transform: uppercase;
`;

export const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 14px;
  align-items: flex-start;
  margin-bottom: 10px;
  color: #cbd5e1;
  font-size: 14px;
`;

export const Status = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 700;
  font-size: 12px;
`;

export const Review = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: #e2e8f0;
`;

export const Rejection = styled.p`
  color: #fca5a5;
  font-size: 14px;
  margin: 30px 0 4px;
`;

export const Link = styled.a`
  display: inline-block;
  margin-top: 6px;
  color: #7dd3fc;
  font-weight: 400;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Actions = styled.div`
  margin-top: 14px;
  display: grid;
  gap: 10px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  resize: vertical;
  min-height: 80px;
  padding: 10px 12px;
  border-left: 10px;
  border-radius: 8px;
  border: 1px solid rgba(102, 126, 234, 0.3);
  background: rgba(255, 255, 255, 0.06);
  color: #e2e8f0;
  font-size: 14px;

  &::placeholder {
    color: #94a3b8;
  }
`;

export const ErrorText = styled.div`
  color: #fca5a5;
  font-size: 12px;
  margin-top: 4px;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Button = styled.button`
  border: ${({ $variant }) =>
    $variant === "ghost" ? "1px solid rgba(102, 126, 234, 0.4)" : "none"};
  background: ${({ $variant }) =>
    $variant === "ghost"
      ? "transparent"
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  margin-top: 0;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`;

export const ResubmitRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-top: 12px;
`;

export const FileInput = styled.input`
  border: 1px dashed rgba(102, 126, 234, 0.6);
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.35);
  color: #e2e8f0;
`;

export const DeleteRow = styled.div`
  margin-top: 12px;
`;

export const DeleteButton = styled.button`
  background: rgba(190, 18, 60, 0.2);
  border: 1px solid rgba(244, 63, 94, 0.4);
  color: #fda4af;
  padding: 10px 14px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(244, 63, 94, 0.3);
    box-shadow: 0 6px 18px rgba(244, 63, 94, 0.2);
  }
`;
