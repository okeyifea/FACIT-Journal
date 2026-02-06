import Database from "better-sqlite3";

const db = new Database("research.db");

// Enable foreign keys
db.pragma("foreign_keys = ON");

// USERS
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  )
`).run();

// CATEGORIES
db.prepare(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`).run();

// Populate categories if empty
const existing = db.prepare("SELECT COUNT(*) AS count FROM categories").get();
if (existing.count === 0) {
  const insert = db.prepare("INSERT INTO categories (name) VALUES (?)");
  const categories = [
    "Artificial Intelligence",
    "Cloud Computing",
    "Cybersecurity",
    "Quantum Computing",
    "Blockchain",
    "Data Science",
    "Other"
  ];
  for (const cat of categories) insert.run(cat);
}

// RESEARCH PAPERS
db.prepare(`
  CREATE TABLE IF NOT EXISTS research_papers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    authors TEXT NOT NULL,
    abstract TEXT NOT NULL,
    pdf_path TEXT NOT NULL,
    category INTEGER NOT NULL,
    submitted_by TEXT NOT NULL,
    citation_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'submitted',
    approval_required INTEGER DEFAULT 2,
    approval_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category) REFERENCES categories(id)
  )
`).run();

export default db;