import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const usersDbPath = path.resolve(__dirname, "..", "..", "users.db");
const db = new Database(usersDbPath);

export const getUserById = (id) => {
  return db.prepare("SELECT id, password_hash FROM users WHERE id = ?").get(id);
};

export const updateUserPassword = (id, hashedPassword) => {
  return db.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(
    hashedPassword,
    id
  );
};
