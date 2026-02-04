const initDbContent = require("./initDbContent");

function initDb(db) {
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
        folder_id INTEGER NULL,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        FOREIGN KEY (folder_id) REFERENCES folders(id)
      );

      CREATE TABLE IF NOT EXISTS flashcards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stack_id INTEGER NOT NULL,
        front_header TEXT,
        front_text TEXT NOT NULL,
        back_header TEXT,
        back_text TEXT NOT NULL,
        FOREIGN KEY (stack_id) REFERENCES stacks(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS folders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        parent_folder_id INTEGER NULL,
        name TEXT NOT NULL,
        description TEXT,
        FOREIGN KEY (parent_folder_id) REFERENCES folders(id) ON DELETE CASCADE
      );
    `);

  initDbContent(db);
}

module.exports = initDb;
