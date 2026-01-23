// imports the express framework
const express = require("express");
// creates the express application
// app is now the central object and defines stuff like routing: app.get, app.post | adding middelware | and so on...
const app = express();
// reads the PORT enviroment variable
// it falls back on PORT 3001 if no variable is decleared
const PORT = process.env.PORT || 3001;
// hashing modul zum hashen von passwords
const bycrypt = require("bcrypt");
// aufrufen der app.db
const db = require("./db/db");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// lets express read JSON bodies
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

    // gets the id, email, password_hash from email out of the json-body
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

    // console.log(req.body);
    return res.status(200).json({ message: "Backend received login request" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error." });
  }
});

// register request
app.post("/register", async (req, res) => {
  try {
    const { email, password, repeatPassword } = req.body;

    if (!email || !password || !repeatPassword) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    if (password !== repeatPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // bcrypt cost factor
    const password_hash = await bycrypt.hash(password, 12);

    // erstellt den db befehl in einer varible da
    const stmt = db.prepare(`
      INSERT INTO users (email, password_hash)
      VALUES (?, ?)
      `);

    // fuehrt den db befehl mit den daten den users aus
    stmt.run(email.toLowerCase().trim(), password_hash);

    console.log(req.body);
    return res
      .status(200)
      .json({ message: "Backend received register request" });
  } catch (err) {
    // checked ob email schon regestriert ist
    if (String(err).includes("UNIQUE")) {
      return res.status(409).json({ message: "Email already registered" });
    }

    console.log(err);
    return res.status(500).json({ message: "Server error." });
  }
});

// starts the server on the defined PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
