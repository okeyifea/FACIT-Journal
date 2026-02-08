import express from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import db from "../db.js"; 

const router = express.Router();

//FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

    if (!user) {
      // Always return success to avoid leaking emails
      return res.json({ message: "Reset link sent if email exists" });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 15 * 60 * 1000; // 15 minutes

    // Update user with token
    db.prepare(`
      UPDATE users
      SET resetPasswordToken = ?, resetPasswordExpires = ?
      WHERE id = ?
    `).run(token, expires, user.id);

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetURL = `http://localhost:3000/reset-password/${token}`;

    await transporter.sendMail({
      to: user.email,
      from: "FACIT Journal <no-reply@facit.com>",
      subject: "Password Reset",
      html: `
        <p>You requested a password reset.</p>
        <p>Click below to reset your password:</p>
        <a href="${resetURL}">${resetURL}</a>
        <p>This link expires in 15 minutes.</p>
      `
    });

    res.json({ message: "Reset link sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

//RESET PASSWORD
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Find user with valid token
    const user = db.prepare(`
      SELECT * FROM users 
      WHERE resetPasswordToken = ? AND resetPasswordExpires > ?
    `).get(token, Date.now());

    if (!user) {
      return res.status(400).json({ error: "Token expired or invalid" });
    }

    // Hash new password (keep consistent with login)
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    // Update password and clear token
    db.prepare(`
      UPDATE users
      SET password_hash = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL, updatedAt = strftime('%s','now')
      WHERE id = ?
    `).run(hashedPassword, user.id);

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
