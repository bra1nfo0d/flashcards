const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "..", "app.db");

const db = new Database(dbPath);

// Enforce foreign keys (useful once you add relations)
db.pragma("foreign_keys = ON");

module.exports = db;
