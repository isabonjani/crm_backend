const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    const user = rows[0];
    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
    const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
exports.me = (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
};
