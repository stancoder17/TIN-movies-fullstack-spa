import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Equivalent of __dirname for ES Modules
const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const dbPath = path.join(dirName, 'database.db');
const scriptPath = path.join(dirName, 'db-script.sql');

const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
});

// Enable Foreign Keys (SQLite has them OFF by default)
await db.exec('PRAGMA foreign_keys = ON;');

console.log(`Connected to SQLite database at: ${dbPath}`);

try {
    if (fs.existsSync(scriptPath)) {
        const dbScript = fs.readFileSync(scriptPath, 'utf8');
        await db.exec(dbScript);
        console.log('Database schema initialized.');
    } else {
        console.warn('Initialization script not found, skipping schema creation.');
    }
} catch (error) {
    console.error('Error executing database script:', error.message);
}

export default db;