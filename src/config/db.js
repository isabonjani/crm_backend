const mysql = require("mysql2/promise");
const dotenv = require("dotenv").config();
// Carrega .env conforme NODE_ENV
//dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
module.exports = pool;
