require("dotenv").config();

const getDb = require("./getDb");

const initDB = async () => {
  const pool = await getDb();

  const connection = await pool.getConnection();

  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        service VARCHAR(50) NOT NULL,
        extras JSON,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        images JSON,
        status VARCHAR(50) NOT NULL,
        createdAt DATETIME NOT NULL
      )
    `);

    console.log("✅ DB inicializada");
  } finally {
    connection.release();
  }

  return pool;
};

module.exports = { initDB };