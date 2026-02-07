import styled from "styled-components"; 

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  flex: 1;
`;

export const Header = styled.div`
  margin-bottom: 2rem;
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  p {
    color: #666;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

/* Messages */
export const Message = styled.p`
  text-align: center;
  color: #666;
  margin: 1rem 0;
`;

/* Card Grid */
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

/* Paper Card */
export const PaperCard = styled.div`
  background: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  h3 {
    font-size: 1.25rem;
  }
`;

export const Badge = styled.span`
  background-color: #0070f3;
  color: #fff;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

/* Meta Information */
export const Meta = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  div {
    display: flex;
    flex-direction: column;
    strong {
      font-size: 0.75rem;
      color: #333;
    }
    span {
      font-size: 0.875rem;
      color: #555;
    }
  }
`;

/* Abstract */
export const Abstract = styled.div`
  margin-bottom: 1rem;
  strong {
    display: block;
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 0.875rem;
    color: #555;
  }
`;

/* Actions */
export const Actions = styled.div`
  display: flex;
  gap: 1rem;
  a, button {
    background-color: #0070f3;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    text-decoration: none;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #005bb5;
    }
  }
`;

/* Category Filter Section */
export const CategorySection = styled.div`
  margin-bottom: 2rem;
`;

export const CategoryTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

export const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const CategoryItem = styled.button`
  background-color: ${props => (props.$active ? "#0070f3" : "#e0e0e0")};
  color: ${props => (props.$active ? "#fff" : "#333")};
  border: none;
  border-radius: 0.25rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    background-color: ${props => (props.$active ? "#005bb5" : "#ccc")};
  }
`;