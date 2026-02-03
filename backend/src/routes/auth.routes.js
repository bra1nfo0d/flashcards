const express = require("express");
const bycrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
const db = require("../db");
//cosnt {JWT_SECRET} = require("../middleware/auth.middleware")

const router = express.Router();

// login request
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = db
      .prepare(
        `SELECT id, email, username, password_hash FROM users WHERE email = ?`,
      )
      .get(email.toLowerCase().trim());

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const ok = await bycrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    return res.status(200).json({
      message: "Login succesful",
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error." });
  }
});

// register request
router.post("/register", async (req, res) => {
  try {
    const { email, username, password, repeatPassword } = req.body;

    if (!email || !username || !password || !repeatPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== repeatPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const password_hash = await bycrypt.hash(password, 12);

    const stmt = db.prepare(`
      INSERT INTO users (email, username, password_hash)
      VALUES (?, ?, ?)
      `);

    const cleanEmail = email.toLowerCase().trim();
    const cleanUsername = username.trim();

    const result = stmt.run(cleanEmail, cleanUsername, password_hash);

    return res.status(200).json({
      message: "Register succesful",
      user: {
        id: result.lastInsertRowid,
        username: cleanUsername,
        email: cleanEmail,
      },
    });
  } catch (err) {
    if (String(err).includes("UNIQUE")) {
      const msg = String(err);

      if (msg.includes("users.email")) {
        return res
          .status(409)
          .json({ field: "email", message: "Email already taken." });
      }

      if (msg.includes("users.username")) {
        return res
          .status(409)
          .json({ field: "username", message: "Username already taken" });
      }

      return res
        .status(409)
        .json({ message: "Email or username already taken." });
    }

    return res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
