const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/create", (req, res) => {
  const { parent_folder_id, name, description } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Folder name required" });
  }

  try {
    const result = db
      .prepare(
        `
		INSERT INTO folders (parent_folder_id, name, description)
		VALUES (?, ?, ?)`,
      )
      .run(parent_folder_id ?? null, name, description || "");

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

router.get("/get-all", (req, res) => {
  try {
    const result = db
      .prepare(
        `
      SELECT * FROM folders ORDER BY id`,
      )
      .all();

    return res.status(200).json({
      result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to get all folders" });
  }
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Folder id required" });
  }

  try {
    db.prepare("DELETE FROM folders WHERE id = ?").run(id);

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
