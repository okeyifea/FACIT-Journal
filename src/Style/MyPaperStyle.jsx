import styled from "styled-components"; 

export const Main = styled.main`
`;

export const Header = styled.div`
  width: 900px;
 display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px 30px 80px 100px;
  border-radius: 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.05"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>');
    pointer-events: none;
  }

  p {
    position: relative;
    z-index: 1;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    margin: 8px 0;
  }
`;

export const Content = styled.div`
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
