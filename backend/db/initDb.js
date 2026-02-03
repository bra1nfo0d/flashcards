const Database = require("better-sqlite3");
const path = require("path");
const initDbContent = require("./initDbContent");


const dbPath = path.join(__dirname, "..", "app.db");

const db = new Database(dbPath);

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS stacks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS flashcards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stack_id INTEGER NOT NULL,
      front_header TEXT,
      front_text TEXT NOT NULL,
      back_header TEXT,
      back_text TEXT NOT NULL,
      FOREIGN KEY (stack_id) REFERENCES stacks(id)
    );
  `);

initDbContent(db);

console.log("Database initialized");

module.exports = db;
