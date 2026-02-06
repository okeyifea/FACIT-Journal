import express from "express";
import multer from "multer";
import ResearchService from "../service/ResearchService.js";

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
      role,
    });

    res.json({ message: "Paper submitted successfully", paperId: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }
    const papers = await ResearchService.getByUserEmail(email);
    res.json(papers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
