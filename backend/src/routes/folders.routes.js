const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/create", (req, res) => {
  const { name, description } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Folder name required" });
  }

  try {
    const result = db
      .prepare(
        `
		INSERT INTO folders (name, description)
		VALUES (?, ?)`,
      )
      .run(name, description || "");

    res.json({
      id: result.lastInsertRowid,
      name,
      description,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create folder" });
  }
});

module.exports = router;
