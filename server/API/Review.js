import express from "express";
import db from "../db.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import "../Models/review.js";

const router = express.Router();

router.post("/review", authMiddleware, (req, res) => {
  const { paperId, decision, comment } = req.body;

  if (!paperId || !decision) {
    return res.status(400).json({ message: "paperId and decision are required" });
  }

  if (!["approved", "rejected"].includes(decision)) {
    return res.status(400).json({ message: "Invalid decision" });
  }

  if (decision === "rejected" && !comment?.trim()) {
    return res.status(400).json({ message: "Comment is required for rejection" });
  }

  const role = req.user?.role;
  if (!["staff", "officer"].includes(role)) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const paper = db.prepare(`SELECT * FROM research_papers WHERE id = ?`).get(paperId);
  if (!paper) {
    return res.status(404).json({ message: "Paper not found" });
  }

  if (paper.status !== "pending") {
    return res.status(400).json({ message: "Paper is not pending review" });
  }

  const existingReview = db.prepare(`
    SELECT * FROM reviews WHERE paperId = ? AND role = ?
  `).get(paperId, role);
  if (existingReview) {
    return res.status(400).json({ message: "You have already reviewed this paper" });
  }

  if (role === "staff") {
    if (paper.author_role && paper.author_role !== "student") {
      return res.status(403).json({ message: "Staff can only review student papers" });
    }
  }

  if (role === "officer") {
    if (paper.author_role === "student") {
      const staffReview = db.prepare(`
        SELECT * FROM reviews WHERE paperId = ? AND role = 'staff' AND decision = 'approved'
      `).get(paperId);
      if (!staffReview) {
        return res.status(400).json({ message: "Staff approval required first" });
      }
    }
  }

  db.prepare(`
    INSERT INTO reviews (paperId, reviewerId, role, decision, comment)
    VALUES (?, ?, ?, ?, ?)
  `).run(paperId, req.user.id, role, decision, comment?.trim() || null);

  if (decision === "rejected") {
    if (role === "officer" && (paper.resubmission_count || 0) >= 1) {
      db.prepare(`UPDATE research_papers SET status = 'rejected_final' WHERE id = ?`).run(paperId);
    } else {
      db.prepare(`UPDATE research_papers SET status = 'rejected' WHERE id = ?`).run(paperId);
    }
  } else {
    db.prepare(`UPDATE research_papers SET approval_count = approval_count + 1 WHERE id = ?`).run(paperId);
    if (role === "officer") {
      db.prepare(`UPDATE research_papers SET status = 'approved', approval_count = 2 WHERE id = ?`).run(paperId);
    }
  }

  return res.json({ message: "Review submitted" });
});

export default router;
