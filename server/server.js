/* eslint-env node */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Database from "better-sqlite3";
import crypto from "crypto";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new Database("users.db");

// Create users table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password_hash TEXT,
    role TEXT,
    fullName TEXT,
    email TEXT,
    phone TEXT,
    registrationNumber TEXT,
    position TEXT
  )
`);

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
  console.log("Login request received:", req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password required",
    });
  }

  try {
    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const passwordHash = hashPassword(password);
    if (user.password_hash !== passwordHash) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        registrationNumber: user.registrationNumber,
        position: user.position,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// SIGNUP route
app.post("/signup", (req, res) => {
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

  // Basic required fields
  if (!username || !password || !role || !fullName || !email) {
    return res.status(400).json({
      success: false,
      message: "Username, password, role, full name and email are required",
    });
  }

  // Role-based validation
  if (role === "student" && !registrationNumber) {
    return res.status(400).json({
      success: false,
      message: "Registration number is required for students",
    });
  }

  if (role === "officer" && !position) {
    return res.status(400).json({
      success: false,
      message: "Position is required for officers",
    });
  }

  try {
    // Check if username already exists
    const existingUser = db
      .prepare("SELECT id FROM users WHERE username = ?")
      .get(username);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
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
      role,
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
});

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