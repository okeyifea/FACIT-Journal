import React from "react";
import {
  Main,
  HomeText,
  SearchBar,
  LatestPublicationHeader,
  PublishedPapers
} from "../Style/HomeStyle.jsx";
import Layout from "./Common/layout";

import SideNav from "./SideNav";

const Home = ({ user, setUser }) => {
  //const navigate = useNavigate();

  return (
    <Layout>
      <SideNav user={user} setUser={setUser}/>
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
              style={{
                height: "30px",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            />
            <button style={{ margin: "0px" }}>Search</button>
          </div>
        </SearchBar>

        <LatestPublicationHeader>
          <h2>LATEST PUBLICATION</h2>
        </LatestPublicationHeader>
        <PublishedPapers>
          <div className="article-card">
            <h3>Understanding React Hooks</h3>
            <p>Author: Jane Doe</p>
            <p>Published: June 2024</p>
            <a href="">Read More</a>
            <button>Download</button>
          </div>
          <div className="article-card">
            <h3>Class Predictive Model</h3>
            <p>Author: John Smith</p>
            <p>Published: May 2024</p>
            <a href="">Read More</a>
            <button>Download</button>
          </div>
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
