/* eslint-env node */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import db from "./db.js";

import researchRoutes from "./API/Research.js";
import authRoutes from "./API/Pass.js";
import restRoutes from "./API/restPass.js";
import dashboardRoutes from "./API/Dashboard.js";
import reviewRoutes from "./API/Review.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsPath = path.resolve(__dirname, "..", "uploads");
app.use("/uploads", express.static(uploadsPath));
app.use("/api/research", researchRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth", restRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", reviewRoutes);

// Hash function (SHA-256 for demo; use bcrypt in production)
const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

// Seed sample users
const seedUsers = () => {
  const users = [
    {
      username: "student1",
      password: "password123",
      role: "student",
      fullName: "John Student",
      email: "student1@example.com",
      phone: "1234567890",
      registrationNumber: "GOU/UCC/CSC/001",
      position: null,
    },
    {
      username: "staff1",
      password: "password123",
      role: "staff",
      fullName: "Jane Staff",
      email: "staff1@example.com",
      phone: "9876543210",
      registrationNumber: null,
      position: null,
    },
    {
      username: "officer1",
      password: "password123",
      role: "officer",
      fullName: "Dr. Officer Dean",
      email: "officer1@example.com",
      phone: "5555555555",
      registrationNumber: null,
      position: "HOD",
    },
  ];

  const insert = db.prepare(`
    INSERT OR IGNORE INTO users (
      username,
      password_hash,
      role,
      fullName,
      email,
      phone,
      registrationNumber,
      position
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  users.forEach((user) => {
    insert.run(
      user.username,
      hashPassword(user.password),
      user.role,
      user.fullName,
      user.email,
      user.phone || null,
      user.registrationNumber || null,
      user.position || null
    );
  });

  console.log("Database seeded with sample users.");
};

seedUsers();

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ success: false, message: "Username and password required" });

  try {
    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const passwordHash = hashPassword(password);
    if (user.password_hash !== passwordHash)
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        registrationNumber: user.registrationNumber,
        position: user.position
      },
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const handleSignup = (req, res) => {
  console.log("Signup request received:", req.body);

  const {
    username,
    password,
    role,
    fullName,
    email,
    phone,
    registrationNumber,
    position,
  } = req.body;

  const normalizedRole = String(role || "").toLowerCase();
  const allowedRoles = new Set(["student", "staff", "officer"]);

  // Basic required fields
  if (!username || !password || !normalizedRole || !fullName || !email) {
    return res.status(400).json({
      success: false,
      message: "Username, password, role, full name and email are required",
    });
  }

  if (!allowedRoles.has(normalizedRole)) {
    return res.status(400).json({
      success: false,
      message: "Invalid role. Must be student, staff, or officer",
    });
  }

  // Role-based validation
  if (normalizedRole === "student" && !registrationNumber) {
    return res.status(400).json({
      success: false,
      message: "Registration number is required for students",
    });
  }

  if (normalizedRole === "officer" && !position) {
    return res.status(400).json({
      success: false,
      message: "Position is required for officers",
    });
  }

  try {
    // Check if username already exists
    const existingUser = db
      .prepare("SELECT id FROM users WHERE username = ? OR email = ?")
      .get(username, email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    // Insert user
    const insert = db.prepare(`
      INSERT INTO users (
        username,
        password_hash,
        role,
        fullName,
        email,
        phone,
        registrationNumber,
        position
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      username,
      hashPassword(password),
      normalizedRole,
      fullName,
      email,
      phone || null,
      registrationNumber || null,
      position || null
    );

    console.log(`User ${username} registered successfully`);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// SIGNUP routes (both legacy and API-prefixed)
app.post("/signup", handleSignup);
app.post("/api/auth/signup", handleSignup);

// Get all users (for testing)
app.get("/users", (req, res) => {
  try {
    const users = db.prepare("SELECT id, username, role, fullName, email FROM users").all();
    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Backend server running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
