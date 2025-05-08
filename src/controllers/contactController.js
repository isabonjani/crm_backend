const pool = require("../config/db");
exports.getAll = async (req, res, next) => {
  try {
    const [contacts] = await pool.query("SELECT * FROM contacts");
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};
exports.getById = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM contacts WHERE id = ?", [
      req.params.id,
    ]);
    if (!rows.length)
      return res.status(404).json({ error: "Contato não encontrado" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};
exports.create = async (req, res, next) => {
  try {
    const { name, email, phone, company } = req.body;
    const [result] = await pool.query(
      "INSERT INTO contacts (name, email, phone, company) VALUES (?, ?, ?, ?)",
      [name, email, phone, company]
    );
    res.status(201).json({ id: result.insertId, name, email, phone, company });
  } catch (err) {
    next(err);
  }
};
exports.update = async (req, res, next) => {
  try {
    const { name, email, phone, company } = req.body;
    await pool.query(
      "UPDATE contacts SET name=?, email=?, phone=?, company=? WHERE id=?",
      [name, email, phone, company, req.params.id]
    );
    res.json({ id: +req.params.id, name, email, phone, company });
  } catch (err) {
    next(err);
  }
};
exports.remove = async (req, res, next) => {
  try {
    await pool.query("DELETE FROM contacts WHERE id = ?", [req.params.id]);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
