import React, { useState, useEffect, useMemo, useCallback } from "react";
//import styled from "styled-components";


import Layout from "../Component/Common/layout.jsx";
import SideNav from "./SideNav.jsx";
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
  NoResults
} from "../Style/ArchiveStyle.jsx";

import { API_URL } from "../../server/API/Auth.js";

const Archive = ({ user, setUser }) => {
  const [allPapers, setAllPapers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  // Fetch all approved papers from backend
  const fetchPapers = useCallback(async () => {
    try {
      const query = new URLSearchParams();
      query.append("status", "approved");
      if (searchQuery) query.append("search", searchQuery);
      if (sortBy) query.append("sort", sortBy);

      const res = await fetch(`${API_URL}/api/research?${query.toString()}`);
      const data = await res.json();
      const papersList = Array.isArray(data) ? data : data?.data || [];

      console.log("Fetched papers:", papersList);

      setAllPapers(papersList);
    } catch (err) {
      console.error("Error fetching papers:", err);
    }
  }, [searchQuery, sortBy]);

  // Initial fetch
  useEffect(() => {
  fetch(`${API_URL}/api/research?status=approved`)
    .then(res => res.json())
    .then(data => {
      const papersList = Array.isArray(data) ? data : data?.data || [];
      setAllPapers(papersList);
    })
    .catch(err => console.error(err));
}, []);

  // Build categories from allPapers
  const categories = useMemo(() => {
    const catSet = new Set(allPapers.map(p => p.category || "Uncategorized"));
    const cats = ["all", ...Array.from(catSet)];

    return cats.map(cat => ({
      id: cat,
      label: cat === "all" ? "All Papers" : cat,
      count:
        cat === "all"
          ? allPapers.length
          : allPapers.filter(p => p.category === cat).length
    }));
  }, [allPapers]);

  // Derived filtered papers
  const filteredPapers = useMemo(() => {
    let filtered = allPapers;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.title.toLowerCase().includes(query) ||
          p.authors.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy === "recent") {
      filtered = filtered.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (sortBy === "citations") {
      filtered = filtered.sort((a, b) => (b.citation_count || 0) - (a.citation_count || 0));
    } else if (sortBy === "alphabetical") {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [allPapers, selectedCategory, searchQuery, sortBy]);

  return (
    <Layout>
      <SideNav user={user} setUser={setUser} />
      <Main>
        <ArchiveHeader>
          <h1>Research Archive</h1>
          <p>Explore our collection of published research papers and academic articles</p>
        </ArchiveHeader>

        <ArchiveContainer>
          <SearchFilterSection>
            <SearchBox>
              <input
                type="text"
                placeholder="Search papers by title or author..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button onClick={fetchPapers}>🔍</button>
            </SearchBox>

            <Controls>
              <SortDropdown value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="recent">Sort by: Most Recent</option>
                <option value="citations">Sort by: Citations</option>
                <option value="alphabetical">Sort by: Title A-Z</option>
              </SortDropdown>

              <ResultCount>
                {filteredPapers.length} paper{filteredPapers.length !== 1 ? "s" : ""} found
              </ResultCount>
            </Controls>
          </SearchFilterSection>

          <ContentWrapper>
            <Sidebar>
              <CategoryTitle>Categories</CategoryTitle>
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
              {filteredPapers.length > 0 ? (
                <PapersList>
                  {filteredPapers.map(paper => (
                    <PaperCard key={paper.id}>
                      <PaperHeader>
                        <h3>{paper.title}</h3>
                        <Badge>{new Date(paper.created_at).getFullYear()}</Badge>
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
      </Main>
    </Layout>
  );
};

export default Archive;