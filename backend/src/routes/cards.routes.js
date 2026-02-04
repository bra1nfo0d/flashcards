const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/stack", (req, res) => {
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

module.exports = router;
