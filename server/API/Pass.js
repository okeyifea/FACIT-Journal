import express from "express";
import crypto from "crypto";
import { getUserById, updateUserPassword } from "../service/userServer.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

/**
 * POST /api/auth/update-password
 */
router.post("/update-password", authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔐 Verify current password
    // If you’re using SHA-256 from your seed
    const currentHash = crypto.createHash("sha256").update(currentPassword).digest("hex");

    if (user.password_hash !== currentHash) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // 🔒 Hash new password
    // You can switch to bcrypt here if you want stronger security
    const hashedPassword = crypto.createHash("sha256").update(newPassword).digest("hex");

    await updateUserPassword(userId, hashedPassword);

    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Update password error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
