import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at top right, rgba(102, 126, 234, 0.18), transparent 45%),
    rgba(15, 23, 42, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
  padding: 20px;
  backdrop-filter: blur(6px);
`;

const ModalCard = styled.div`
  width: 100%;
  max-width: 540px;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.98));
  color: #e2e8f0;
  border-radius: 16px;
  border: 1px solid rgba(102, 126, 234, 0.35);
  box-shadow:
    0 25px 60px rgba(15, 23, 42, 0.55),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  padding: 24px 22px;
`;

const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.2px;
`;

const Message = styled.p`
  margin: 0 0 18px;
  color: #cbd5e1;
  line-height: 1.6;
  font-size: 14px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const Button = styled.button`
  border: ${({ $variant }) =>
    $variant === "ghost" ? "1px solid rgba(148, 163, 184, 0.45)" : "none"};
  background: ${({ $variant }) =>
    $variant === "danger"
      ? "linear-gradient(135deg, #fb7185 0%, #f43f5e 100%)"
      : $variant === "ghost"
      ? "transparent"
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  color: white;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(102, 126, 234, 0.25);
  }
`;

const Modal = ({ open, title, message, onClose, actions }) => {
  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        {title && <Title>{title}</Title>}
        {message && <Message>{message}</Message>}
        <ButtonRow>
          {actions?.length
            ? actions.map((action, index) => (
                <Button
                  key={`${action.label}-${index}`}
                  onClick={action.onClick}
                  $variant={action.variant}
                >
                  {action.label}
                </Button>
              ))
            : (
              <Button onClick={onClose}>Close</Button>
            )}
        </ButtonRow>
      </ModalCard>
    </Overlay>
  );
};

export default Modal;
