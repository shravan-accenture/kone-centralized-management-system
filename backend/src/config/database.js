const sqlite3 = require("sqlite3").verbose();

// Local SQLite database used by the proof-of-concept backend.
const db = new sqlite3.Database("./database/app.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to SQLite");
  }
});

// Stores each uploaded file so the app can track upload history and metadata.
db.run(`
CREATE TABLE IF NOT EXISTS files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  original_name TEXT NOT NULL,
  stored_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

// Stores product rows parsed from uploaded spreadsheets.
db.run(`
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id TEXT,
  product_name TEXT,
  price INTEGER,
  region TEXT
)
`);


module.exports = db;
