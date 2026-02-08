import express from "express";
import db from "../db.js"; 
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

//OFFICER DASHBOARD

router.get("/dashboard/officer", authMiddleware, (req, res) => {
  if (req.user.role !== "officer") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  // 1️⃣ Staff papers pending officer review
  const staffPapers = db.prepare(`
    SELECT rp.*, c.name AS category
    FROM research_papers rp
    JOIN categories c ON rp.category = c.id
    WHERE rp.author_role = 'staff' AND rp.status = 'pending'
  `).all();

  // 2️⃣ Student papers approved by staff but pending officer
  const studentPapers = db.prepare(`
    SELECT rp.*, c.name AS category
    FROM research_papers rp
    JOIN categories c ON rp.category = c.id
    WHERE rp.author_role = 'student' AND rp.status = 'pending'
  `).all();

  const filteredStudentPapers = studentPapers.filter(paper => {
    const staffReview = db.prepare(`
      SELECT * FROM reviews 
      WHERE paperId = ? AND role = 'staff' AND decision = 'approved'
    `).get(paper.id);

    const officerReview = db.prepare(`
      SELECT * FROM reviews 
      WHERE paperId = ? AND role = 'officer'
    `).get(paper.id);

    return staffReview && !officerReview;
  });

  const filteredStaffPapers = staffPapers.filter(paper => {
    const officerReview = db.prepare(`
      SELECT * FROM reviews 
      WHERE paperId = ? AND role = 'officer'
    `).get(paper.id);
    return !officerReview;
  });

  const attachReviews = (papers) =>
    papers.map((paper) => ({
      ...paper,
      reviews: db.prepare(`SELECT * FROM reviews WHERE paperId = ?`).all(paper.id)
    }));

  res.json({
    staffPapers: attachReviews(filteredStaffPapers),
    studentPapers: attachReviews(filteredStudentPapers)
  });
});

//STAFF DASHBOARD

router.get("/dashboard/staff", authMiddleware, (req, res) => {
  if (req.user.role !== "staff") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  // Student papers pending staff review
  const studentPapers = db.prepare(`
    SELECT rp.*, c.name AS category
    FROM research_papers rp
    JOIN categories c ON rp.category = c.id
    WHERE rp.author_role = 'student' AND rp.status = 'pending'
  `).all();

  const pendingStaffReview = studentPapers.filter(paper => {
    const staffReview = db.prepare(`
      SELECT * FROM reviews
      WHERE paperId = ? AND role = 'staff'
    `).get(paper.id);

    return !staffReview; // Only papers not yet reviewed by staff
  });

  // Staff's own papers
  const myPapers = db.prepare(`
    SELECT rp.*, c.name AS category
    FROM research_papers rp
    JOIN categories c ON rp.category = c.id
    WHERE rp.submitted_by = ?
  `).all(req.user.email);

  const attachReviews = (papers) =>
    papers.map((paper) => ({
      ...paper,
      reviews: db.prepare(`SELECT * FROM reviews WHERE paperId = ?`).all(paper.id)
    }));

  res.json({
    pendingStaffReview: attachReviews(pendingStaffReview),
    myPapers: attachReviews(myPapers)
  });
});

//STUDENT DASHBOARD

router.get("/dashboard/student", authMiddleware, (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  // Student's own papers
  const myPapers = db.prepare(`
    SELECT rp.*, c.name AS category
    FROM research_papers rp
    JOIN categories c ON rp.category = c.id
    WHERE rp.submitted_by = ?
  `).all(req.user.email);

  // Include reviews for each paper
  const papersWithReviews = myPapers.map(paper => {
    const reviews = db.prepare(`
      SELECT * FROM reviews
      WHERE paperId = ?
    `).all(paper.id);
    return { ...paper, reviews };
  });

  res.json(papersWithReviews);
});

export default router;
