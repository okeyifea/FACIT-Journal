import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";

const ToastContext = createContext(null);

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
  pointer-events: none;
`;

const ToastItem = styled.div`
  min-width: 260px;
  max-width: 380px;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  color: #0b1220;
  background: ${({ $variant }) =>
    $variant === "success"
      ? "linear-gradient(135deg, #86efac 0%, #4ade80 100%)"
      : "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)"};
  border: 1px solid rgba(102, 126, 234, 0.35);
  box-shadow:
    0 14px 30px rgba(15, 23, 42, 0.18),
    inset 0 0 0 1px rgba(255, 255, 255, 0.25);
  animation: ${slideIn} 0.22s ease;
  pointer-events: auto;
`;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, variant = "success", duration = 3000) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { id, message, variant }]);
    window.setTimeout(() => removeToast(id), duration);
  }, [removeToast]);

  const value = useMemo(() => ({ addToast }), [addToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} $variant={toast.variant}>
            {toast.message}
          </ToastItem>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};
