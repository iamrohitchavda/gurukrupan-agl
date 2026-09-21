const path = require("node:path");
const Database = require("better-sqlite3");
const { app } = require("electron");

let database;

function getDatabase() {
  if (database) return database;

  const databasePath = path.join(app.getPath("userData"), "gurukrupan-agl.db");
  database = new Database(databasePath);
  database.pragma("journal_mode = WAL");
  database.exec(`
    CREATE TABLE IF NOT EXISTS app_metadata (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
  return database;
}

function getDatabaseStatus() {
  const row = getDatabase().prepare("SELECT COUNT(*) AS count FROM app_metadata").get();
  return { ready: true, recordCount: row.count };
}

function closeDatabase() {
  if (database) {
    database.close();
    database = undefined;
  }
}

module.exports = { closeDatabase, getDatabaseStatus };
