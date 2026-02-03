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
}

module.exports = initDb;
