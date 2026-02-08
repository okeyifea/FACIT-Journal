import db from "../db.js";

export const getUserById = (id) => {
  return db.prepare("SELECT id, password_hash FROM users WHERE id = ?").get(id);
};

export const updateUserPassword = (id, hashedPassword) => {
  return db.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(
    hashedPassword,
    id
  );
};
