import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';
import Database from 'better-sqlite3';

// Define the paths for the database
const tmpDbPath = join('/tmp', 'data.db');
const localDbPath = './data.db';

// In production, copy the local database file to the writable `/tmp` directory if it doesn't already exist
if (process.env.NODE_ENV === 'production' && !existsSync(tmpDbPath)) {
  copyFileSync(localDbPath, tmpDbPath);
}

// Initialize the SQLite database
const db = new Database(
  process.env.NODE_ENV === 'production' ? tmpDbPath : localDbPath
);

// Optionally, initialize the database schema if needed
const initDatabase = () => {
  const usersTableExists = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users';").get();
  if (!usersTableExists) {
    console.log('Initializing database schema...');
    db.exec(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL
      );
    `);
    console.log('Database schema initialized.');
  }
};

initDatabase();

export default db;
