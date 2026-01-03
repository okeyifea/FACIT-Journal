import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";

const Archive = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  // Sample archived papers data
  const papers = [
    {
      id: 1,
      title: "Advanced Machine Learning Techniques",
      authors: "Dr. Smith, Prof. Johnson",
      category: "ai",
      year: 2024,
      date: "June 2024",
      abstract: "This paper explores cutting-edge machine learning algorithms and their applications in modern computing.",
      citations: 45
    },
    {
      id: 2,
      title: "Cloud Computing Infrastructure",
      authors: "Dr. Williams, Dr. Brown",
      category: "cloud",
      year: 2024,
      date: "May 2024",
      abstract: "A comprehensive study on scalable cloud computing architectures and best practices.",
      citations: 32
    },
    {
      id: 3,
      title: "Cybersecurity in IoT Devices",
      authors: "Prof. Davis, Dr. Miller",
      category: "security",
      year: 2023,
      date: "December 2023",
      abstract: "Investigating security vulnerabilities and protection mechanisms for Internet of Things systems.",
      citations: 28
    },
    {
      id: 4,
      title: "Quantum Computing Fundamentals",
      authors: "Dr. Anderson",
      category: "quantum",
      year: 2023,
      date: "October 2023",
      abstract: "An introduction to quantum computing principles and their computational advantages.",
      citations: 52
    },
    {
      id: 5,
      title: "Blockchain Technology Applications",
      authors: "Dr. Taylor, Prof. White",
      category: "blockchain",
      year: 2023,
      date: "August 2023",
      abstract: "Exploring practical applications of blockchain beyond cryptocurrency.",
      citations: 38
    },
    {
      id: 6,
      title: "Data Science and Analytics",
      authors: "Dr. Harris",
      category: "data",
      year: 2023,
      date: "July 2023",
      abstract: "Modern approaches to data analysis and extracting insights from big data.",
      citations: 41
    }
  ];

  // Filter papers based on category and search
  let filteredPapers = papers.filter(paper => {
    const matchCategory = selectedCategory === "all" || paper.category === selectedCategory;
    const matchSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        paper.authors.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Sort papers
  if (sortBy === "recent") {
    filteredPapers.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortBy === "citations") {
    filteredPapers.sort((a, b) => b.citations - a.citations);
  } else if (sortBy === "title") {
    filteredPapers.sort((a, b) => a.title.localeCompare(b.title));
  }

  const categories = [
    { id: "all", label: "All Papers", count: papers.length },
    { id: "ai", label: "Artificial Intelligence", count: papers.filter(p => p.category === "ai").length },
    { id: "cloud", label: "Cloud Computing", count: papers.filter(p => p.category === "cloud").length },
    { id: "security", label: "Cybersecurity", count: papers.filter(p => p.category === "security").length },
    { id: "quantum", label: "Quantum Computing", count: papers.filter(p => p.category === "quantum").length },
    { id: "blockchain", label: "Blockchain", count: papers.filter(p => p.category === "blockchain").length },
    { id: "data", label: "Data Science", count: papers.filter(p => p.category === "data").length }
  ];

  return (
    <ArchivePageWrapper>
      <Header />
      
      <ArchiveHeader>
        <h1>Research Archive</h1>
        <p>Explore our collection of published research papers and academic articles</p>
      </ArchiveHeader>

      <ArchiveContainer>
        {/* Search and Filter Section */}
        <SearchFilterSection>
          <SearchBox>
            <input
              type="text"
              placeholder="Search papers by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button>🔍</button>
          </SearchBox>

          <Controls>
            <SortDropdown value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recent">Sort by: Most Recent</option>
              <option value="citations">Sort by: Citations</option>
              <option value="title">Sort by: Title A-Z</option>
            </SortDropdown>

            <ResultCount>
              {filteredPapers.length} paper{filteredPapers.length !== 1 ? "s" : ""} found
            </ResultCount>
          </Controls>
        </SearchFilterSection>

        <ContentWrapper>
          {/* Sidebar Categories */}
          <Sidebar>
            <CategoryTitle>Categories</CategoryTitle>
            <CategoryList>
              {categories.map(cat => (
                <CategoryItem
                  key={cat.id}
                  active={selectedCategory === cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                  <badge>{cat.count}</badge>
                </CategoryItem>
              ))}
            </CategoryList>
          </Sidebar>

          {/* Papers List */}
          <PapersSection>
            {filteredPapers.length > 0 ? (
              <PapersList>
                {filteredPapers.map(paper => (
                  <PaperCard key={paper.id}>
                    <PaperHeader>
                      <h3>{paper.title}</h3>
                      <Badge>{paper.year}</Badge>
                    </PaperHeader>

                    <PaperMeta>
                      <MetaItem>
                        <strong>Authors:</strong> {paper.authors}
                      </MetaItem>
                      <MetaItem>
                        <strong>Published:</strong> {paper.date}
                      </MetaItem>
                      <MetaItem>
                        <strong>Citations:</strong> {paper.citations}
                      </MetaItem>
                    </PaperMeta>

                    <PaperAbstract>
                      <h4>Abstract</h4>
                      <p>{paper.abstract}</p>
                    </PaperAbstract>

                    <PaperActions>
                      <ActionButton primary>View Full Paper</ActionButton>
                      <ActionButton>Download PDF</ActionButton>
                      <ActionButton>Cite</ActionButton>
                    </PaperActions>
                  </PaperCard>
                ))}
              </PapersList>
            ) : (
              <NoResults>
                <p>No papers found matching your criteria.</p>
                <small>Try adjusting your search or filter options</small>
              </NoResults>
            )}
          </PapersSection>
        </ContentWrapper>
      </ArchiveContainer>
    </ArchivePageWrapper>
  );
};

export default Archive;

const ArchivePageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f1724 0%, #1a1f2e 100%);
  padding-top: 75px;
`;

const ArchiveHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 30px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
  margin-top: 50px;
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

const ArchiveContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 30px;

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const SearchFilterSection = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SearchBox = styled.div`
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

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SortDropdown = styled.select`
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

const ResultCount = styled.div`
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

const ContentWrapper = styled.div`
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

const Sidebar = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  height: fit-content;
  border: 1px solid rgba(102, 126, 234, 0.2);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 100px;

  @media (max-width: 768px) {
    position: static;
    top: auto;
  }
`;

const CategoryTitle = styled.h3`
  color: white;
  font-size: 18px;
  margin: 0 0 15px 0;
  font-weight: 700;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CategoryItem = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(102, 126, 234, 0.1)'};
  color: white;
  border: 1px solid ${props => props.active ? '#667eea' : 'rgba(102, 126, 234, 0.2)'};
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

const PapersSection = styled.div`
  width: 100%;
`;

const PapersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PaperCard = styled.div`
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

const PaperHeader = styled.div`
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

const Badge = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`;

const PaperMeta = styled.div`
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

const MetaItem = styled.div`
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

const PaperAbstract = styled.div`
  margin-bottom: 20px;

  h4 {
    color: white;
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

const PaperActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
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

const NoResults = styled.div`
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