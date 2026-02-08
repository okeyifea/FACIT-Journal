import db from "../db.js";

// Create table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS papers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    abstract TEXT NOT NULL,
    fileUrl TEXT,
    submittedBy TEXT NOT NULL,
    authorRole TEXT CHECK(authorRole IN ('student', 'staff', 'officer')) NOT NULL,
    status TEXT CHECK(status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    isPublished INTEGER DEFAULT 0,
    revisionOf INTEGER,
    createdAt INTEGER DEFAULT (strftime('%s','now')),
    updatedAt INTEGER DEFAULT (strftime('%s','now')),
    FOREIGN KEY(submittedBy) REFERENCES users(id)
  )
`).run();

// Helper functions

export const createPaper = ({ title, abstract, fileUrl, submittedBy, authorRole, revisionOf }) => {
  const stmt = db.prepare(`
    INSERT INTO papers (title, abstract, fileUrl, submittedBy, authorRole, revisionOf)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(title, abstract, fileUrl, submittedBy, authorRole, revisionOf || null);
  return info.lastInsertRowid;
};

export const getPaperById = (id) => {
  return db.prepare(`SELECT * FROM papers WHERE id = ?`).get(id);
};

export const updatePaperStatus = (id, status) => {
  return db.prepare(`
    UPDATE papers
    SET status = ?, updatedAt = strftime('%s','now')
    WHERE id = ?
  `).run(status, id);
};

export const listPapersByAuthor = (authorId) => {
  return db.prepare(`SELECT * FROM papers WHERE submittedBy = ?`).all(authorId);
};

export default db;
