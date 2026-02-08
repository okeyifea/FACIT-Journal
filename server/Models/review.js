import db from "../db.js";

const hasTable = (name) =>
  !!db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name = ?").get(name);

const fkTargets = (table) => {
  try {
    return db.prepare(`PRAGMA foreign_key_list(${table})`).all().map((fk) => fk.table);
  } catch {
    return [];
  }
};

const createReviewsTable = () => {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      paperId INTEGER NOT NULL,
      reviewerId INTEGER NOT NULL,
      role TEXT CHECK(role IN ('staff', 'officer')) NOT NULL,
      decision TEXT CHECK(decision IN ('approved', 'rejected')) NOT NULL,
      comment TEXT,
      reviewedAt INTEGER DEFAULT (strftime('%s','now')),
      UNIQUE(paperId, role), -- enforce 1 staff + 1 officer max
      FOREIGN KEY(paperId) REFERENCES research_papers(id),
      FOREIGN KEY(reviewerId) REFERENCES users(id)
    )
  `).run();
};

if (hasTable("reviews")) {
  const targets = fkTargets("reviews");
  if (targets.includes("papers")) {
    db.exec(`
      PRAGMA foreign_keys=off;
      BEGIN TRANSACTION;
      ALTER TABLE reviews RENAME TO reviews_old;
    `);
    createReviewsTable();
    db.exec(`
      INSERT INTO reviews (id, paperId, reviewerId, role, decision, comment, reviewedAt)
      SELECT id, paperId, reviewerId, role, decision, comment, reviewedAt FROM reviews_old;
      DROP TABLE reviews_old;
      COMMIT;
      PRAGMA foreign_keys=on;
    `);
  }
} else {
  createReviewsTable();
}

// Helper functions

export const addReview = ({ paperId, reviewerId, role, decision, comment }) => {
  const stmt = db.prepare(`
    INSERT INTO reviews (paperId, reviewerId, role, decision, comment)
    VALUES (?, ?, ?, ?, ?)
  `);
  return stmt.run(paperId, reviewerId, role, decision, comment || null);
};

export const getReviewsByPaper = (paperId) => {
  return db.prepare(`SELECT * FROM reviews WHERE paperId = ?`).all(paperId);
};

export const getReviewByRole = (paperId, role) => {
  return db.prepare(`SELECT * FROM reviews WHERE paperId = ? AND role = ?`).get(paperId, role);
};

export default db;
