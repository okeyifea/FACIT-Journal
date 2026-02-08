import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Main,
  Header,
} from "../Style/MyPaperStyle.jsx";

import{
  Sidebar,
  Badge,
  CategoryTitle,
  CategoryList,
  CategoryItem,
  ContentWrapper,
  PapersSection,
  PaperCard,
  PaperHeader,
  PaperActions,
  ActionButton,
  PaperMeta,
  MetaItem,
  PaperAbstract,
  PapersList,
  ViewMoreContainer,
  ViewMoreButton,
  NoResults

}from "../Style/ArchiveStyle.jsx";

import Layout from "./Common/layout";
import { API_URL } from "../../server/API/Auth.js";

const CATEGORY_LABELS = {
  1: "Artificial Intelligence",
  2: "Cloud Computing",
  3: "Cybersecurity",
  4: "Quantum Computing",
  5: "Blockchain",
  6: "Data Science",
  7: "Other"
};

const formatCategoryLabel = (value) => {
  if (value === null || value === undefined || value === "") return "Uncategorized";
  const key = typeof value === "number" ? value : Number(value);
  return CATEGORY_LABELS[key] || String(value);
};

const MyPaper = ({ user, setUser }) => {
  const [allPapers, setAllPapers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const papersPerPage = 2;

  // Fetch all approved papers
  const fetchPapers = useCallback(async (signal) => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/research/my-papers?email=${encodeURIComponent(user.email)}&status=approved`,
        { signal }
      );
      const data = await res.json();
      const fetchedPapers = Array.isArray(data) ? data : data?.data || [];
      setAllPapers(fetchedPapers);
    } catch (err) {
      if (err?.name !== "AbortError") console.error(err);
      setAllPapers([]);
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  // Initial fetch
  useEffect(() => {
    if (!user?.email) return;
    const controller = new AbortController();
    fetchPapers(controller.signal);
    return () => controller.abort();
  }, [user?.email, fetchPapers]);

  // Compute categories from user's papers
  const categories = useMemo(() => {
    const catSet = new Set(allPapers.map(p => p.category || "Uncategorized"));
    const cats = ["all", ...Array.from(catSet)];
    return cats.map(cat => ({
      id: cat,
      label: cat === "all" ? "All Papers" : formatCategoryLabel(cat),
      count:
        cat === "all"
          ? allPapers.length
          : allPapers.filter(p => (p.category || "Uncategorized") === cat).length
    }));
  }, [allPapers]);

  // Derived papers based on selected category
  const filteredPapers = useMemo(() => {
    if (selectedCategory === "all") return allPapers;
    return allPapers.filter(p => (p.category || "Uncategorized") === selectedCategory);
  }, [allPapers, selectedCategory]);

  const startIndex = currentPage * papersPerPage;
  const visiblePapers = filteredPapers.slice(
    startIndex,
    startIndex + papersPerPage
  );

  return (
    <Layout user={user} setUser={setUser}>
      <Main>
        {!user ? (
          <NoResults>Please log in to view your papers.</NoResults>
        ) : (
        <><Header>
              <h1 style={{ fontSize: "35px", fontWeight: "800", margin: "0", color: "white" }}>
                My Papers
              </h1>
              <p>My Personal Research Work & Project</p>
            </Header><ContentWrapper>
                {/* Category Filter */}
                <Sidebar>
                  <CategoryTitle>Filter by Category</CategoryTitle>
                  <CategoryList>
                    {categories.map(cat => (
                      <CategoryItem
                        key={cat.id}
                        $active={selectedCategory === cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
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
                            <Badge>{new Date(paper.created_at).getFullYear()}</Badge>
                          </PaperHeader>

                          <PaperMeta>
                            <MetaItem><strong>Authors:</strong> {paper.authors}</MetaItem>
                            <MetaItem><strong>Category:</strong> {formatCategoryLabel(paper.category)}</MetaItem>
                            <MetaItem><strong>Published:</strong> {new Date(paper.created_at).toLocaleDateString()}</MetaItem>
                            <MetaItem><strong>Citations:</strong> {paper.citation_count ?? 0}</MetaItem>
                          </PaperMeta>

                          <PaperAbstract>
                            <h4>Abstract</h4>
                            <p>{paper.abstract}</p>
                          </PaperAbstract>

                          {paper.pdf_path && (
                            <PaperActions>
                              <ActionButton
                                href={`${API_URL}/${paper.pdf_path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View PDF
                              </ActionButton>
                              <ActionButton
                                onClick={() => {
                                  const link = document.createElement("a");
                                  link.href = `${API_URL}/${paper.pdf_path}`;
                                  link.download = `${paper.title}.pdf`;
                                  link.click();
                                } }
                              >
                                Download
                              </ActionButton>
                            </PaperActions>
                          )}
                        </PaperCard>
                      ))}
                    </PapersList>
                  ) : (
                    !loading && (
                      <NoResults>No papers found for {user?.email || "this user"}.</NoResults>
                    )
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
              </ContentWrapper></>
        )}
      </Main>
    </Layout>
  );
};

export default MyPaper;
