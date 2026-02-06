import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import Layout from "./Common/layout";
import SideNav from "./SideNav";
import { API_URL } from "../../server/API/Auth.js";

const MyPaper = ({ user, setUser }) => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPapers = useCallback(async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/research?status=approved`);
      const data = await res.json();
      const allPapers = Array.isArray(data) ? data : (data?.data || []);
      const papersList = allPapers.filter(paper => paper.submitted_by === user?.email);
      console.log("My papers:", papersList);
      setPapers(papersList);
    } catch (err) {
      if (err?.name !== "AbortError") {
        console.error(err);
        setPapers([]);
      }
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    if (!user?.email) return;
    const controller = new AbortController();
    const id = setTimeout(() => {
      fetchPapers(controller.signal);
    }, 0);
    return () => {
      clearTimeout(id);
      controller.abort();
    };
  }, [user?.email, fetchPapers]);


  return (
    <Layout>
      <SideNav user={user} onLogout={() => setUser?.(null)} />
      <Main>
        <Header>
          <h1>My Papers</h1>
          <p>Papers submitted with your email address.</p>
        </Header>

        <Content>
          {loading && <Message>Loading papers...</Message>}
          {!loading && papers.length === 0 && (
            <Message>No papers found for {user?.email || "this user"}.</Message>
          )}

          <CardGrid>
            {papers.map((paper) => (
              <PaperCard key={paper.id}>
                <CardHeader>
                  <h3>{paper.title}</h3>
                  <Badge>{new Date(paper.created_at).getFullYear()}</Badge>
                </CardHeader>
                <Meta>
                  <div>
                    <strong>Authors</strong>
                    <span>{paper.authors}</span>
                  </div>
                  <div>
                    <strong>Category</strong>
                    <span>{paper.category}</span>
                  </div>
                  <div>
                    <strong>Published</strong>
                    <span>{new Date(paper.created_at).toLocaleDateString()}</span>
                  </div>
                </Meta>
                <Abstract>
                  <strong>Abstract</strong>
                  <p>{paper.abstract}</p>
                </Abstract>
                {paper.pdf_path && (
                  <Actions>
                    <a
                      href={`${API_URL}/${paper.pdf_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View PDF
                    </a>
                    <button
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = `${API_URL}/${paper.pdf_path}`;
                        link.download = `${paper.title}.pdf`;
                        link.click();
                      }}
                    >
                      Download
                    </button>
                  </Actions>
                )}
              </PaperCard>
            ))}
          </CardGrid>
        </Content>
      </Main>
    </Layout>
  );
};

export default MyPaper;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 80px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 36px;
    margin: 0 0 8px 0;
    color: #fff;
  }

  p {
    color: #cbd5e1;
    margin: 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Message = styled.div`
  text-align: center;
  color: #cbd5e1;
  padding: 20px;
  border: 1px dashed rgba(102, 126, 234, 0.3);
  border-radius: 12px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const PaperCard = styled.div`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.85), rgba(51, 65, 85, 0.85));
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  padding: 20px;
  color: #e2e8f0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;

  h3 {
    margin: 0;
    font-size: 18px;
    color: #fff;
    line-height: 1.4;
  }
`;

const Badge = styled.span`
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
`;

const Meta = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;

  strong {
    display: block;
    color: #7dd3fc;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  span {
    font-size: 14px;
  }
`;

const Abstract = styled.div`
  strong {
    display: block;
    color: #7dd3fc;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: #cbd5e1;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  a,
  button {
    background: transparent;
    border: 1px solid rgba(102, 126, 234, 0.6);
    color: #fff;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  a:hover,
  button:hover {
    background: rgba(102, 126, 234, 0.15);
    border-color: #667eea;
  }
`;
