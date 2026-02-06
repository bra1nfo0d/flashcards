const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/create", (req, res) => {
  const { folder_id, name, description } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Stack name required" });
  }

  try {
    const result = db
      .prepare(
        `
	  INSERT INTO stacks (folder_id, name, description)
	  VALUES (?, ?, ?)`,
      )
      .run(folder_id ?? null, name, description || "");

    res.status(201).json({
      id: result.lastInsertRowid,
      name,
      description,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create stack" });
  }
});

router.get("/get-all", (req, res) => {
  try {
    const result = db
      .prepare(
        `
      SELECT * FROM stacks ORDER BY id`,
      )
      .all();

    return res.status(200).json({
      result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to get stacks" });
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "id is requiered" });
  }

  try {
    const stack = db
      .prepare(
        `
      SELECT * FROM stacks WHERE id = ?`,
      )
      .get(id);

    return res.status(200).json({
      result: stack,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to get stack" });
  }
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Stack id required" });
  }

  try {
    db.prepare("DELETE FROM flashcards WHERE stack_id = ?").run(id);
    db.prepare("DELETE FROM stacks WHERE id = ?").run(id);

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
