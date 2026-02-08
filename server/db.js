import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, "..", "research.db");
const db = new Database(dbPath);

// Enable foreign keys
db.pragma("foreign_keys = ON");

const getColumns = (table) => {
  try {
    return db.prepare(`PRAGMA table_info(${table})`).all().map((col) => col.name);
  } catch {
    return [];
  }
};

const ensureColumn = (table, column, definition) => {
  const columns = getColumns(table);
  if (!columns.includes(column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${definition}`);
  }
};

// USERS
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password_hash TEXT,
    role TEXT,
    fullName TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    registrationNumber TEXT,
    position TEXT,
    resetPasswordToken TEXT,
    resetPasswordExpires INTEGER,
    createdAt INTEGER DEFAULT (strftime('%s','now')),
    updatedAt INTEGER DEFAULT (strftime('%s','now'))
  )
`).run();

ensureColumn("users", "username", "username TEXT");
ensureColumn("users", "password_hash", "password_hash TEXT");
ensureColumn("users", "role", "role TEXT");
ensureColumn("users", "fullName", "fullName TEXT");
ensureColumn("users", "email", "email TEXT");
ensureColumn("users", "phone", "phone TEXT");
ensureColumn("users", "registrationNumber", "registrationNumber TEXT");
ensureColumn("users", "position", "position TEXT");
ensureColumn("users", "resetPasswordToken", "resetPasswordToken TEXT");
ensureColumn("users", "resetPasswordExpires", "resetPasswordExpires INTEGER");
ensureColumn("users", "createdAt", "createdAt INTEGER DEFAULT (strftime('%s','now'))");
ensureColumn("users", "updatedAt", "updatedAt INTEGER DEFAULT (strftime('%s','now'))");

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
    author_role TEXT NOT NULL,
    citation_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending',
    approval_required INTEGER DEFAULT 2,
    approval_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category) REFERENCES categories(id)
  )
`).run();

ensureColumn("research_papers", "submitted_by", "submitted_by TEXT");
ensureColumn("research_papers", "author_role", "author_role TEXT");
ensureColumn("research_papers", "status", "status TEXT DEFAULT 'pending'");
ensureColumn("research_papers", "approval_required", "approval_required INTEGER DEFAULT 2");
ensureColumn("research_papers", "approval_count", "approval_count INTEGER DEFAULT 0");
ensureColumn("research_papers", "resubmission_count", "resubmission_count INTEGER DEFAULT 0");

const paperColumns = getColumns("research_papers");
if (paperColumns.includes("submittedBy") && !paperColumns.includes("submitted_by")) {
  db.exec("ALTER TABLE research_papers ADD COLUMN submitted_by TEXT");
  db.exec("UPDATE research_papers SET submitted_by = submittedBy WHERE submitted_by IS NULL");
}



export default db;
