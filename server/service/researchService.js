import db from "../db.js";

class ResearchService {

  static create({ title, authors, abstract, category, submittedBy, pdfPath }) {
    // All submissions are auto-approved
    const approvalRequired = 0;
    const status = "approved";

    // Validate category exists
    const categoryExists = db
      .prepare("SELECT id FROM categories WHERE id = ?")
      .get(category);

    if (!categoryExists) {
      throw new Error("Category does not exist");
    }

    // Insert research paper
    const stmt = db.prepare(`
      INSERT INTO research_papers
      (title, authors, abstract, pdf_path, category, submitted_by, status, approval_required, approval_count, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP)
    `);

    const result = stmt.run(
      title,
      authors,
      abstract,
      pdfPath,
      category,
      submittedBy,
      status,
      approvalRequired
    );

    return result; 
  }

  static getAll({ authors, category, search, sort, status }) {
    let query = `
      SELECT rp.*,
             c.name AS category
      FROM research_papers rp
      JOIN categories c ON rp.category = c.id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      query += " AND rp.status = ?";
      params.push(status);
    } else {
      query += " AND rp.status = 'approved'";
    }

    if (authors) {
      query += " AND rp.authors LIKE ?";
      params.push(`%${authors}%`);
    }

    if (category) {
      query += " AND rp.category = ?";
      params.push(category);
    }

    if (search) {
      query += " AND rp.title LIKE ?";
      params.push(`%${search}%`);
    }

    switch (sort) {
      case "citations":
        query += " ORDER BY rp.citation_count DESC";
        break;
      case "alphabetical":
        query += " ORDER BY rp.title COLLATE NOCASE ASC";
        break;
      case "recent":
      default:
        query += " ORDER BY rp.created_at DESC";
    }

    return db.prepare(query).all(...params);
  }

  static incrementCitation(id) {
    return db.prepare(`
      UPDATE research_papers
      SET citation_count = citation_count + 1
      WHERE id = ?
    `).run(id);
  }

  static getByUserEmail(email) {
    return db.prepare(`
      SELECT * FROM research_papers
      WHERE submitted_by = ?
      ORDER BY created_at DESC
    `).all(email);
  }
}

export default ResearchService;
