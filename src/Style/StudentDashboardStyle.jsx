import styled from "styled-components";

export const Dashboard = styled.div`
  margin: 0 auto;
  max-width: 1100px;
  padding: 20px 0 32px;
  text-align: left;
`;

export const Tabs = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const Tab = styled.h3`
  cursor: pointer;
  padding: 10px 18px;
  font-size: 15px;
  font-weight: 700;
  color: ${({ $active }) => ($active ? "white" : "#111827")};
  border-radius: 999px;
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "rgba(102, 126, 234, 0.12)"};
  border: 1px solid
    ${({ $active }) => ($active ? "transparent" : "rgba(102, 126, 234, 0.35)")};
  box-shadow: ${({ $active }) =>
    $active ? "0 6px 18px rgba(102, 126, 234, 0.35)" : "none"};
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(102, 126, 234, 0.25);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
`;

export const EmptyMessage = styled.p`
 display: flex
 justify content: center;
 text-align:  center;
  padding: 18px 8px;
  color: #94a3b8;
  font-size: 14px;
`;
