import express from "express";
import multer from "multer";
import ResearchService from "../service/ResearchService.js";
import db from "../db.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import "../Models/review.js";

const router = express.Router();

// FILE UPLOAD CONFIG
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    file.mimetype === "application/pdf" ? cb(null, true) : cb(new Error("Only PDF allowed"));
  }
});

// SUBMIT PAPER
router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    const { title, authors, abstract, category, submittedBy, role } = req.body;

    if (!title || !abstract || !authors || !category || !role || !submittedBy) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!req.file) return res.status(400).json({ message: "PDF file required" });

    const result = await ResearchService.create({
      title,
      abstract,
      pdfPath: req.file.path,
      authors,
      category,
      submittedBy,
      role
    });

    res.json({ message: "Paper submitted successfully", paperId: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// RESUBMIT PAPER (after officer rejection)
router.post("/:id/resubmit", authMiddleware, upload.single("pdf"), (req, res) => {
  const paperId = Number(req.params.id);
  if (!paperId) return res.status(400).json({ message: "Invalid paper id" });

  const paper = db.prepare(`SELECT * FROM research_papers WHERE id = ?`).get(paperId);
  if (!paper) return res.status(404).json({ message: "Paper not found" });

  if (paper.submitted_by !== req.user.email) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const officerRejected = db.prepare(`
    SELECT * FROM reviews WHERE paperId = ? AND role = 'officer' AND decision = 'rejected'
  `).get(paperId);

  if (!officerRejected) {
    return res.status(400).json({ message: "Paper is not rejected by officer" });
  }

  if ((paper.resubmission_count || 0) >= 1) {
    return res.status(400).json({ message: "Resubmission limit reached" });
  }

  if (!req.file) return res.status(400).json({ message: "PDF file required" });

  db.prepare(`
    UPDATE research_papers
    SET pdf_path = ?, status = 'pending', approval_count = 1, resubmission_count = resubmission_count + 1
    WHERE id = ?
  `).run(req.file.path, paperId);

  db.prepare(`
    DELETE FROM reviews WHERE paperId = ? AND role = 'officer'
  `).run(paperId);

  return res.json({ message: "Paper resubmitted for officer review" });
});

// GET ALL PAPERS
router.get("/", async (req, res) => {
  try {
    const papers = await ResearchService.getAll({
      category: req.query.category,
      search: req.query.search,
      sort: req.query.sort,
      status: req.query.status
    });
    res.json(papers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET user's papers
router.get("/my-papers", async (req, res) => {
  try {
    const { email, status } = req.query;
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }
    const papers = await ResearchService.getByUserEmail(email, status);
    res.json(papers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE user's paper (only if not reviewed or rejected by staff)
router.delete("/:id", authMiddleware, (req, res) => {
  const paperId = Number(req.params.id);
  if (!paperId) return res.status(400).json({ message: "Invalid paper id" });

  const paper = db.prepare(`SELECT * FROM research_papers WHERE id = ?`).get(paperId);
  if (!paper) return res.status(404).json({ message: "Paper not found" });

  if (paper.submitted_by !== req.user.email) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const reviews = db.prepare(`SELECT * FROM reviews WHERE paperId = ?`).all(paperId);
  const staffRejected = reviews.some((r) => r.role === "staff" && r.decision === "rejected");
  const officerRejected = reviews.some((r) => r.role === "officer" && r.decision === "rejected");
  const hasAnyReview = reviews.length > 0;

  const canDelete =
    (paper.status === "pending" && !hasAnyReview) ||
    (paper.status === "rejected" && staffRejected) ||
    (paper.author_role === "staff" &&
      officerRejected &&
      (paper.status === "rejected" || paper.status === "rejected_final")) ||
    paper.status === "rejected_final";

  if (!canDelete) {
    return res.status(400).json({ message: "Paper cannot be deleted" });
  }

  db.prepare(`DELETE FROM reviews WHERE paperId = ?`).run(paperId);
  db.prepare(`DELETE FROM research_papers WHERE id = ?`).run(paperId);

  return res.json({ message: "Paper deleted" });
});

export default router;
