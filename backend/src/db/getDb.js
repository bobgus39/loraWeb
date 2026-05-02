require("dotenv").config();

const mysql = require("mysql2/promise");

let pool;

const getDb = async () => {
  if (!pool) {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      port: process.env.MYSQL_PORT,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DB}\``
    );

    await connection.end();

    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      port: process.env.MYSQL_PORT,
      database: process.env.MYSQL_DB,
      waitForConnections: true,
      connectionLimit: 10,
    });
  }

  return pool;
};

module.exports = getDb;