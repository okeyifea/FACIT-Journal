import React from "react";
import styled from "styled-components";
import { API_URL } from "../../../server/API/Auth.js";

const SearchResultsModal = ({ show, onClose, searchQuery, results }) => {
  if (!show) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div>
            <h3>Search Results</h3>
            <p>
              "{searchQuery}" • {results.length} result
              {results.length !== 1 && "s"}
            </p>
          </div>
          <CloseButton onClick={onClose} aria-label="Close">
            ×
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          {results.length === 0 && <EmptyState>No papers found.</EmptyState>}
          {results.map((paper) => (
            <PaperCard key={paper.id}>
              <PaperTitle>{paper.title}</PaperTitle>
              <Divider />
              <MetaRow>
                <span>Author: {paper.authors}</span>
                <span>Published: {new Date(paper.created_at).toLocaleDateString()}</span>
              </MetaRow>
              <Actions>
                <ActionLink
                  href={`${API_URL}/${paper.pdf_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </ActionLink>
                <ActionButton
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = `${API_URL}/${paper.pdf_path}`;
                    link.download = `${paper.title}.pdf`;
                    link.click();
                  }}
                >
                  Download
                </ActionButton>
              </Actions>
            </PaperCard>
          ))}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SearchResultsModal;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at top right, rgba(102, 126, 234, 0.22), transparent 50%),
    radial-gradient(circle at bottom left, rgba(124, 58, 237, 0.18), transparent 55%),
    rgba(8, 12, 22, 0.78);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(6px);
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, rgba(12, 18, 34, 0.98), rgba(22, 30, 52, 0.98));
  width: 100%;
  max-width: 820px;
  border-radius: 16px;
  padding: 22px;
  max-height: 80vh;
  overflow-y: auto;
  border: 1px solid rgba(102, 126, 234, 0.45);
  box-shadow:
    0 25px 60px rgba(15, 23, 42, 0.55),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    padding: 18px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    margin: 0;
    font-size: 22px;
    font-weight: 800;
    color: #fff;
  }

  p {
    margin: 6px 0 0;
    color: #cbd5e1;
    font-size: 13px;
  }
`;

const CloseButton = styled.button`
  font-size: 22px;
  background: transparent;
  color: #e2e8f0;
  margin-bottom: 30px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(102, 126, 234, 0.3);
  }
`;

const ModalBody = styled.div`
  display: grid;
  gap: 14px;
`;

const PaperCard = styled.div`
  padding: 16px 18px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.92), rgba(30, 41, 59, 0.92));
  border: 1px solid rgba(102, 126, 234, 0.28);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.2);
  display: grid;
  gap: 8px;

  &:hover {
    border-color: rgba(102, 126, 234, 0.55);
    box-shadow: 0 14px 30px rgba(102, 126, 234, 0.2);
  }
`;

const PaperTitle = styled.h4`
  margin: 0;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: #cbd5e1;
  font-size: 13px;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(102, 126, 234, 0.22);
  margin: 2px 0 4px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;`;

const ActionLink = styled.a`
  color: #7dd3fc;
  text-decoration: none;
  font-weight: 600;
  font-size: 13px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(102, 126, 234, 0.35);
  background: rgba(102, 126, 234, 0.08);

  &:hover {
    text-decoration: underline;
  }
`;

const ActionButton = styled.button`
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: 700;
  margin-top: 0;
  font-size: 12px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(102, 126, 234, 0.35);
  }
`;

const EmptyState = styled.p`
  margin: 0;
  color: #cbd5e1;
  font-size: 14px;
  text-align: center;
`;
