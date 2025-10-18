import Database from "better-sqlite3";

const db = new Database("database.db");

// Create table if it doesn’t exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT
  )
`).run();

// Insert a sample page if empty
const row = db.prepare("SELECT COUNT(*) AS count FROM pages").get();
if (row.count === 0) {
  db.prepare("INSERT INTO pages (title, content) VALUES (?, ?)").run("Welcome!", "This is your editable homepage content.");
}

export default db;
