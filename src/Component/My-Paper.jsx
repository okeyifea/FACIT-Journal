import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Main,
  Header,
  Content,
  Message,
  CardGrid,
  PaperCard,
  CardHeader,
  Badge,
  Meta,
  Abstract,
  Actions,
  CategorySection,
  CategoryTitle,
  CategoryList,
  CategoryItem
} from "../Style/MyPaperStyle.jsx";

import Layout from "./Common/layout";
import SideNav from "./SideNav";
import { API_URL } from "../../server/API/Auth.js";

const MyPaper = ({ user, setUser }) => {
  const [allPapers, setAllPapers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  // Fetch all approved papers
  const fetchPapers = useCallback(async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/research?status=approved`);
      const data = await res.json();
      const fetchedPapers = Array.isArray(data) ? data : data?.data || [];
      const userPapers = fetchedPapers.filter(
        paper => paper.submitted_by === user?.email
      );
      console.log("My papers:", userPapers);
      setAllPapers(userPapers);
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
    fetchPapers();
    return () => controller.abort();
  }, [user?.email, fetchPapers]);

  // Compute categories from user's papers
  const categories = useMemo(() => {
    const catSet = new Set(allPapers.map(p => p.category || "Uncategorized"));
    const cats = ["all", ...Array.from(catSet)];
    return cats.map(cat => ({
      id: cat,
      label: cat === "all" ? "All Papers" : cat,
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

  return (
    <Layout>
      <SideNav user={user} onLogout={() => setUser?.(null)} />
      <Main>
        <Header>
          <h1>My Papers</h1>
          <p>Papers submitted with your email address.</p>
        </Header>

        <Content>
          {/* Category Filter */}
          <CategorySection>
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
          </CategorySection>

          {loading && <Message>Loading papers...</Message>}
          {!loading && filteredPapers.length === 0 && (
            <Message>No papers found for {user?.email || "this user"}.</Message>
          )}

          <CardGrid>
            {filteredPapers.map(paper => (
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
                    <span>{paper.category || "Uncategorized"}</span>
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