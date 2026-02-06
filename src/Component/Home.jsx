import React, { useState, useEffect } from "react";
import {
  Main,
  HomeText,
  SearchBar,
  LatestPublicationHeader,
  PublishedPapers
} from "../Style/HomeStyle.jsx";
import { API_URL } from "../../server/API/Auth.js";
import Layout from "./Common/layout";
import SideNav from "./SideNav";

const Home = ({ user, setUser }) => {
  const [papers, setPapers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch papers from backend
  const fetchPapers = (search = "") => {
    const query = new URLSearchParams();
    query.append("status", "approved");
    if (search) query.append("search", search);
    const url = `${API_URL}/api/research?${query.toString()}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const papersList = Array.isArray(data) ? data : (data?.data || []);
        setPapers(papersList);
      })
      .catch(err => {
        console.error("Error fetching papers:", err);
        setPapers([]);
      });
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleSearch = () => {
    fetchPapers(searchQuery);
  };

  return (
    <Layout>
      <SideNav user={user} setUser={setUser} />
      <Main>
        <HomeText>
          <p style={{ fontSize: "35px", fontWeight: "800", margin: "0" }}>
            FACULTY OF COMPUTING AND INFORMATION TECHNOLOGY
          </p>
          <p style={{ fontSize: "25px", margin: "10px" }}>
            GODFREY OKOYE UNIVERSITY
          </p>
          <p>Digital Research & Journal Archive</p>
        </HomeText>

        <SearchBar>
          <div className="search_bar">
            <span style={{ fontSize: "20px" }}>search research paper ...</span>
            <input
              type="text"
              placeholder="Type your search here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ height: "30px", borderRadius: "4px", fontSize: "14px" }}
            />
            <button style={{ margin: "0px" }} onClick={handleSearch}>Search</button>
          </div>
        </SearchBar>

        <LatestPublicationHeader>
          <h2>LATEST PUBLICATION</h2>
        </LatestPublicationHeader>

        <PublishedPapers>
          {papers.length === 0 && <p>No publications found.</p>}

          {papers.map(paper => (
            <div className="article-card" key={paper.id}>
              <h3>{paper.title}</h3>
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
              }}>Download</button>
            </div>
          ))}
        </PublishedPapers>

        <footer
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "50px",
            padding: "20px",
            borderTop: "1px solid #444",
          }}
        >
          <p>&copy; 2026 FCIT Journal Platform. All rights reserved.</p>
        </footer>
      </Main>
    </Layout>
  );
};

export default Home;
