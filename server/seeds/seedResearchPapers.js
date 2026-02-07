import db from "../db.js";

db.pragma("foreign_keys = ON");

// Fetch categories
const categories = db
  .prepare("SELECT id, name FROM categories")
  .all();

if (categories.length === 0) {
  console.error("❌ No categories found. Seed categories first.");
  process.exit(1);
}

// DEV reset (safe)
db.prepare("DELETE FROM research_papers").run();
db.prepare("DELETE FROM sqlite_sequence WHERE name='research_papers'").run();

// Emails that MUST exist
const fixedEmails = [
  "student1@example.com",
  "staff1@example.com",
  "officer1@example.com"
];

// Random email generator
const randomEmail = () => {
  const names = ["john", "mary", "ade", "chioma", "ahmed", "grace"];
  const domains = ["gmail.com", "yahoo.com", "edu.ng"];
  return `${names[Math.floor(Math.random() * names.length)]}${Math.floor(
    Math.random() * 1000
  )}@${domains[Math.floor(Math.random() * domains.length)]}`;
};

// Build submitted_by pool
const submittedByPool = [
  ...fixedEmails,
  ...Array.from({ length: 10 }, randomEmail)
];

// Insert statement
const insertPaper = db.prepare(`
  INSERT INTO research_papers (
    title,
    authors,
    abstract,
    pdf_path,
    category,
    submitted_by,
    citation_count,
    status,
    approval_required,
    approval_count,
    created_at
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const TOTAL_PAPERS = 30;

// 1️⃣ Guarantee at least ONE paper per fixed email
fixedEmails.forEach((email, i) => {
  const category = categories[i % categories.length];

  insertPaper.run(
    `Guaranteed Paper by ${email}`,
    `Author ${i + 1}`,
    "This paper guarantees that required test emails exist in the database.",
    `/uploads/guaranteed-paper-${i + 1}.pdf`,
    category.id,
    email,
    Math.floor(Math.random() * 50),
    "approved",
    2,
    2,
    new Date().toISOString()
  );
});

// 2️⃣ Generate remaining random papers
for (let i = fixedEmails.length; i < TOTAL_PAPERS; i++) {
  const category = categories[i % categories.length];
  const submittedBy =
    submittedByPool[Math.floor(Math.random() * submittedByPool.length)];

  insertPaper.run(
    `Sample Research Paper ${i + 1}`,
    `Author ${i + 1}, Co-Author ${i + 2}`,
    "This is a dummy abstract used for testing archive filters, categories, and UI rendering.",
    `/uploads/sample-paper-${i + 1}.pdf`,
    category.id,
    submittedBy,
    Math.floor(Math.random() * 100),
    "approved",
    2,
    2,
    new Date(
      2020 + (i % 5),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    ).toISOString()
  );
}

console.log("✅ Research papers seeded with random + fixed emails");

db.close();
