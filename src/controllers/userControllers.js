const pool = require("../config/db");
const bcrypt = require("bcryptjs");
exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const [existing] = await pool.query(
      "SELECT id FROM users WHERE username = ?",
      [username]
    );
    if (existing.length > 0) {
      return res.status(409).json({ error: "Usuário já existe" });
    }
    const password_hash = bcrypt.hashSync(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users (username, password_hash, created_at, created_by) VALUES (?, ?, now(), ?)",
      [username, password_hash, req.user.id]
    );
    res.status(201).json({ id: result.insertId, username });
  } catch (err) {
    next(err);
  }
};
