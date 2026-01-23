const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const bycrypt = require("bcrypt");
const db = require("./db/db");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

// login request
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = db
      .prepare(`SELECT id, email, password_hash FROM users WHERE email = ?`)
      .get(email.toLowerCase().trim());

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const ok = await bycrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    return res.status(200).json({ message: "Backend received login request" });
  } catch (err) {
    return res.status(500).json({ message: "Server error." });
  }
});

// register request
app.post("/register", async (req, res) => {
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

    stmt.run(email.toLowerCase().trim(), username.trim(), password_hash);

    return res
      .status(200)
      .json({ message: "Backend received register request" });
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
