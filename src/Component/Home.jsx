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
import SearchResultsModal from "./Modals/SearchResultModal.jsx";

const Home = ({ user, setUser }) => {
  const [papers, setPapers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch all papers
  const fetchPapers = () => {
    fetch(`${API_URL}/api/research?status=approved`)
      .then(res => res.json())
      .then(data => {
        const papersList = Array.isArray(data) ? data : data?.data || [];

        // Sort by most recent and take top 10 for latest publication
        setPapers(papersList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10));
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
    if (!searchQuery.trim()) return;
    fetch(`${API_URL}/api/research?status=approved&search=${searchQuery}`)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data?.data || [];
        setSearchResults(results);
        setShowModal(true);
      })
      .catch(err => {
        console.error("Error searching papers:", err);
        setSearchResults([]);
        setShowModal(true);
      });
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
              <span>
                <strong style={{ color: "#7dd3fc" }}>
                 ABSTRACT
                </strong><br/>
                <h4>
                  {paper.abstract.length > 200 ? paper.abstract.substring(0, 200) + "..." : paper.abstract}
                </h4>
              </span>
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

        {showModal && (
          <SearchResultsModal
           show={showModal}
           onClose={() => setShowModal(false)}
           searchQuery={searchQuery}
           results={searchResults}
          />)}

        <footer
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "50px",
            padding: "20px",
            
          }}
        >
          <p>&copy; 2026 FACIT Journal Platform. All rights reserved.</p>
        </footer>
      </Main>
    </Layout>
  );
};

export default Home;
