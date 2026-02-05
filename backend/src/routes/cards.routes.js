const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/my", (req, res) => {
  const stackId = Number(req.query.stackId);
  if (!stackId) return res.status(400).json({ error: "stackId required" });

  const cards = db
    .prepare(
      `
  	SELECT id, stack_id, front_header, front_text, back_header, back_text
  	FROM flashcards
  	WHERE stack_id = ?
  	ORDER BY id ASC
  	`,
    )
    .all(stackId);

  res.json(cards);
});

router.get("/introduction", (req, res) => {
  const stack = db
    .prepare("SELECT id FROM stacks WHERE name = ?")
    .get("Introduction");

  if (!stack) {
    return res.status(404).json({ error: "Introduction stack not found" });
  }

  const cards = db
    .prepare(
      `
    SELECT id, front_header, front_text, back_header, back_text
    FROM flashcards
    WHERE stack_id = ?
    ORDER BY id ASC
    `,
    )
    .all(stack.id);

  res.json(cards);
});

router.post("/create", (req, res) => {
  const { stackId, frontHeader, frontText, backHeader, backText } = req.body;

  if (!stackId) {
    return res.status(400).json({ error: "Missing stack id" });
  }

  if (!frontText || !backText) {
    return res.status(400).json({ error: "Missing Text" });
  }

  try {
    const result = db
      .prepare(
        `
        INSERT INTO flashcards (stack_id, front_header, front_text, back_header, back_text)
        VALUES (?, ?, ?, ?, ?)`,
      )
      .run(stackId, frontHeader || "", frontText, backHeader || "", backText);

    return res.status(200).json({
      id: result.lastInsertRowid,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to create flashcard" });
  }
});

module.exports = router;
