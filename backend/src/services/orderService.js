const { initDB } = require("../db/initDb");


const createOrderDB = async (order, images) => {
   const pool = await initDB();
  const connection = await pool.getConnection();
  const now = new Date();

  try {
    await connection.beginTransaction();

    await connection.query(
      `INSERT INTO orders
      (id, name, email, service, extras, description, price, status, images, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        order.id,
        order.name,
        order.email,
        order.service,
        JSON.stringify(order.extras),
        order.description,
        order.price,
        order.status,
        JSON.stringify(images),
        now,
      ]
    );

    {/*for (const imageUrl of images) {
      await connection.query(
        `INSERT INTO orders (image)
         VALUES (?)`,
        [ imageUrl ]
      );
    }*/}

    await connection.commit();
    return true;

  } catch (err) {
    await connection.rollback();
    throw err;

  } finally {
    connection.release();
  }
};

const getOrdersDB = async () => {
  const [orders] = await db.query(`
    SELECT * FROM orders
    ORDER BY createdAt DESC
  `);

  for (const order of orders) {
    const [images] = await db.query(
      `SELECT image FROM orders WHERE id = ?`,
      [order.id]
    );

    order.images = images.map(img => img.url);

    try {
      order.extras = JSON.parse(order.extras);
    } catch {
      order.extras = {};
    }
  }

  return orders;
};

const updateOrderStatusDB = async (id, status) => {
  await db.query(
    `UPDATE orders SET status = ? WHERE id = ?`,
    [status, id]
  );
};

module.exports = {
  createOrderDB,
  getOrdersDB,
  updateOrderStatusDB,
};