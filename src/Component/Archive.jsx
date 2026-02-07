import React, { useState, useEffect, useMemo, useCallback } from "react";

import Layout from "../Component/Common/layout.jsx";
import SideNav from "./SideNav.jsx";
import SearchResultsModal from "./Modals/SearchResultModal.jsx";

import {
  Main,
  ArchiveHeader,
  ArchiveContainer,
  SearchFilterSection,
  SearchBox,
  Controls,
  SortDropdown,
  ResultCount,
  ContentWrapper,
  Sidebar,
  CategoryTitle,
  CategoryList,
  CategoryItem,
  PapersSection,
  PapersList,
  PaperCard,
  PaperHeader,
  Badge,
  PaperMeta,
  MetaItem,
  PaperAbstract,
  PaperActions,
  ActionButton,
  NoResults,
  ViewMoreContainer,
  ViewMoreButton
} from "../Style/ArchiveStyle.jsx";

import { API_URL } from "../../server/API/Auth.js";

const Archive = ({ user, setUser }) => {
  /* =======================
     STATE
     ======================= */
  const [allPapers, setAllPapers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [modalResults, setModalResults] = useState([]);

  const papersPerPage = 2;

  /* =======================
     FETCH APPROVED PAPERS
     ======================= */
  const fetchApprovedPapers = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/research?status=approved`);
      const data = await res.json();
      setAllPapers(Array.isArray(data) ? data : data?.data || []);
    } catch (error) {
      console.error("Error fetching papers:", error);
    }
  }, []);

  useEffect(() => {
    fetchApprovedPapers();
  }, [fetchApprovedPapers]);

  /* =======================
     SEARCH (MODAL)
     ======================= */
  const handleSearch = () => {
   if (!searchInput.trim()) return;

   setSearchQuery(searchInput); // 🔥 apply search here

   const query = new URLSearchParams({
     status: "approved",
     search: searchInput,
     sort: sortBy
   });

   fetch(`${API_URL}/api/research?${query.toString()}`)
    .then(res => res.json())
    .then(data => {
      setModalResults(Array.isArray(data) ? data : data?.data || []);
      setShowModal(true);
    })
    .catch(err => console.error("Search error:", err));
  };


  /* =======================
     CATEGORIES
     ======================= */
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      allPapers.map(p => p.category || "Uncategorized")
    );

    return [
      { id: "all", label: "All Papers", count: allPapers.length },
      ...Array.from(uniqueCategories).map(cat => ({
        id: cat,
        label: cat,
        count: allPapers.filter(p => p.category === cat).length
      }))
    ];
  }, [allPapers]);

  /* =======================
     FILTER & SORT PAPERS
     ======================= */
  const filteredPapers = useMemo(() => {
    let result = [...allPapers];

    if (selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.title?.toLowerCase().includes(q) ||
          p.authors?.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "citations":
        result.sort(
          (a, b) => (b.citation_count || 0) - (a.citation_count || 0)
        );
        break;
      case "alphabetical":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        result.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
    }

    return result;
  }, [allPapers, selectedCategory, searchQuery, sortBy]);

  /* =======================
     PAGINATION
     ======================= */
  const startIndex = currentPage * papersPerPage;
  const visiblePapers = filteredPapers.slice(
    startIndex,
    startIndex + papersPerPage
  );

  /* =======================
     RENDER
     ======================= */
  return (
    <Layout>
      <SideNav user={user} setUser={setUser} />

      <Main>
        <ArchiveHeader>
          <h1>Research Archive</h1>
          <p>
            Explore our collection of published research papers and academic
            articles
          </p>
        </ArchiveHeader>

        <ArchiveContainer>
          <SearchFilterSection>
            <SearchBox>
              <input
                type="text"
                placeholder="Search papers by title or author..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
              />
              <button onClick={handleSearch}>🔍</button>
            </SearchBox>

            <Controls>
              <SortDropdown
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="recent">Sort by: Most Recent</option>
                <option value="citations">Sort by: Citations</option>
                <option value="alphabetical">Sort by: Title A–Z</option>
              </SortDropdown>

              <ResultCount>
                {filteredPapers.length} paper
                {filteredPapers.length !== 1 && "s"} found
              </ResultCount>
            </Controls>
          </SearchFilterSection>

          {showModal && (
            <SearchResultsModal
              results={modalResults}
              onClose={() => setShowModal(false)}
            />
          )}

          <ContentWrapper>
            <Sidebar>
              <CategoryTitle>CATEGORIES</CategoryTitle>
              <CategoryList>
                {categories.map(cat => (
                  <CategoryItem
                    key={cat.id}
                    $active={selectedCategory === cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCurrentPage(0);
                    }}
                  >
                    <span>{cat.label}</span>
                    <Badge>{cat.count}</Badge>
                  </CategoryItem>
                ))}
              </CategoryList>
            </Sidebar>

            <PapersSection>
              {filteredPapers.length ? (
                <PapersList>
                  {visiblePapers.map(paper => (
                    <PaperCard key={paper.id}>
                      <PaperHeader>
                        <h3>{paper.title}</h3>
                        <Badge>
                          {new Date(paper.created_at).getFullYear()}
                        </Badge>
                      </PaperHeader>

                      <PaperMeta>
                        <MetaItem><strong>Authors:</strong> {paper.authors}</MetaItem>
                        <MetaItem><strong>Category:</strong> {paper.category || "Uncategorized"}</MetaItem>
                        <MetaItem><strong>Published:</strong> {new Date(paper.created_at).toLocaleDateString()}</MetaItem>
                        <MetaItem><strong>Citations:</strong> {paper.citation_count ?? 0}</MetaItem>
                      </PaperMeta>

                      <PaperAbstract>
                        <h4>Abstract</h4>
                        <p>{paper.abstract}</p>
                      </PaperAbstract>

                      <PaperActions>
                        <ActionButton primary>View Full Paper</ActionButton>
                        <ActionButton>Download PDF</ActionButton>
                      </PaperActions>
                    </PaperCard>
                  ))}
                </PapersList>
              ) : (
                <NoResults>
                  <p>No papers found matching your criteria.</p>
                  <small>Try adjusting your search or filters.</small>
                </NoResults>
              )}

              <ViewMoreContainer>
                {currentPage > 0 && (
                  <ViewMoreButton onClick={() => setCurrentPage(p => p - 1)}>
                    View Previous
                  </ViewMoreButton>
                )}

                {startIndex + papersPerPage < filteredPapers.length && (
                  <ViewMoreButton onClick={() => setCurrentPage(p => p + 1)}>
                    View More
                  </ViewMoreButton>
                )}
              </ViewMoreContainer>
            </PapersSection>
          </ContentWrapper>
        </ArchiveContainer>
      </Main>
    </Layout>
  );
};

export default Archive;