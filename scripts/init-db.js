const Database = require('better-sqlite3');
const db = new Database('./data.db');

// Initialize a "users" table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  );
`);

console.log('Database initialized!');
db.close();
