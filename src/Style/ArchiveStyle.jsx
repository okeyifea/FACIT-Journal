import styled from "styled-components";

// --- Layout ---
export const Main = styled.main``;

export const ArchiveHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 30px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
  margin: 30px;
  border-radius: 40px;

  h1 {
    font-size: 48px;
    font-weight: 800;
    margin: 0 0 15px 0;
    letter-spacing: 1px;
  }

  p {
    font-size: 18px;
    margin: 0;
    opacity: 0.95;
    letter-spacing: 0.5px;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;

    h1 {
      font-size: 32px;
    }

    p {
      font-size: 16px;
    }
  }
`;

export const ArchiveContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 30px;

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

// --- Search & Controls ---
export const SearchFilterSection = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const SearchBox = styled.div`
  display: flex;
  gap: 10px;
  background: white;
  border-radius: 50px;
  padding: 10px 20px;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
  transition: all 0.3s ease;

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    color: #333;

    &::placeholder {
      color: #999;
    }
  }

  button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    font-size: 18px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
  }

  @media (max-width: 768px) {
    padding: 8px 15px;

    button {
      width: 36px;
      height: 36px;
      font-size: 16px;
    }
  }
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SortDropdown = styled.select`
  padding: 12px 20px;
  border-radius: 8px;
  border: 2px solid #667eea;
  background: white;
  color: #333;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #764ba2;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ResultCount = styled.div`
  color: #cbd5e1;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 20px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

// --- Content ---
export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: 200px 1fr;
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

// --- Sidebar ---
export const Sidebar = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  height: fit-content;
  border: 1px solid rgba(102, 126, 234, 0.2);
  backdrop-filter: blur(10px);
  position: sticky;

  @media (max-width: 768px) {
    position: static;
    top: auto;
  }
`;

export const CategoryTitle = styled.h3`
  color: black;
  font-size: 18px;
  text-align: center;
  margin: 0 0 15px 0;
  font-weight: 700;
`;

export const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CategoryItem = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(102, 126, 234, 0.1)'};
  color: ${props => props.$active ? 'white' : 'black'};
  border: 1px solid ${props => props.$active ? '#667eea' : 'rgba(102, 126, 234, 0.2)'};
  padding: 12px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 14px;
  text-align: left;

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-color: #667eea;
    transform: translateX(4px);
  }

  badge {
    background: rgba(255, 255, 255, 0.2);
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 700;
  }
`;

// --- Papers Section ---
export const PapersSection = styled.div`
  width: 900px;
`;

export const PapersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const PaperCard = styled.div`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.8) 100%);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  padding: 25px;
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  border-left: 4px solid #667eea;

  &:hover {
    border-left-color: #764ba2;
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.3);
    border-color: rgba(102, 126, 234, 0.4);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const PaperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 15px;

  h3 {
    color: white;
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    flex: 1;
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    h3 {
      font-size: 18px;
    }
  }
`;

export const Badge = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`;

export const PaperMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px 0;
  border-top: 1px solid rgba(102, 126, 234, 0.2);
  border-bottom: 1px solid rgba(102, 126, 234, 0.2);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const MetaItem = styled.div`
  color: #cbd5e1;
  font-size: 13px;
  line-height: 1.6;

  strong {
    color: #7dd3fc;
    font-weight: 600;
    display: block;
    margin-bottom: 3px;
  }
`;

export const PaperAbstract = styled.div`
  margin-bottom: 20px;

  h4 {
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 10px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #7dd3fc;
  }

  p {
    color: #cbd5e1;
    font-size: 14px;
    line-height: 1.7;
    margin: 0;
  }
`;

export const PaperActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ActionButton = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  border: ${props => props.primary ? 'none' : '1px solid rgba(102, 126, 234, 0.4)'};
  background: ${props => props.primary ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent'};
  color: white;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.primary ? '0 6px 20px rgba(102, 126, 234, 0.5)' : '0 4px 15px rgba(102, 126, 234, 0.2)'};
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    width: 100%;
  }
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #cbd5e1;

  p {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 10px 0;
  }

  small {
    font-size: 14px;
    color: #94a3b8;
  }
`;

export const ViewMoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  `;

export const ViewMoreButton = styled.button`
  flex: 1;
  max-width: 200px;
  height: 40px;
  margin: 20px auto 0 auto;
  padding: 10px 25px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
  }
`;
