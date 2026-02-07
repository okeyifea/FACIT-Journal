import React from "react";
import styled from "styled-components";
import { API_URL } from "../../../server/API/Auth.js";

const SearchResultsModal = ({ show, onClose, searchQuery, results }) => {
  if (!show) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>Search Results for "{searchQuery}"</h3>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalBody>
          {results.length === 0 && <p>No papers found.</p>}
          {results.map(paper => (
            <PaperCard key={paper.id}>
              <h4>{paper.title}</h4>
              <p>Author: {paper.authors}</p>
              <p>Published: {new Date(paper.created_at).toLocaleDateString()}</p>
              <a href={`${API_URL}/${paper.pdf_path}`} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
              <button onClick={() => {
                  const link = document.createElement("a");
                  link.href = `${API_URL}/${paper.pdf_path}`;
                  link.download = paper.title + ".pdf";
                  link.click();
                }}>
                    Download
                </button>
            </PaperCard>
          ))}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SearchResultsModal;

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 80%;
  max-width: 700px;
  border-radius: 10px;
  padding: 20px;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    margin: 0;
  }
`;

const CloseButton = styled.button`
  font-size: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const ModalBody = styled.div`
  h4 {
    margin: 0 0 5px 0;
  }
  p {
    margin: 2px 0;
  }
`;

const PaperCard = styled.div`
  margin-bottom: 15px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`;
