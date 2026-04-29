const fs = require("fs-extra");
const path = require("path");
const { object } = require('joi');
const orderSchema = require("../validators/orderValidator");
//const { v4: uuidv4 } = require("uuid");

const DATA_FILE = process.env.DATA_FILE || "../../data/orders.json";

// 📦 crear pedido
const createOrder = async (req, res) => {
  try {
   // const id = uuidv4();

    const {
      orderId,
      name,
      email,
      service,
      extras,
      description,
      price,
    } = req.body;
    //await orderSchema.validateAsync(req.body, req.files);
const images = req.files.map(f => {
  const normalized = f.path.replace(/\\/g, "/");

  const index = normalized.indexOf("uploads");

  return "/" + normalized.substring(index).replace(/\\/g, "/");
});
    const order = {
      id: orderId,
      name,
      email,
      service,
      extras: JSON.parse(extras || "{}"),
      description,
      price: Number(price),
      images,
      status: "pending",
      createdAt: new Date(),
    };

    await fs.ensureFile(DATA_FILE);

    let orders = [];
    if (await fs.pathExists(DATA_FILE)) {
      orders = await fs.readJson(DATA_FILE);
    }

    orders.push(order);

    await fs.writeJson(DATA_FILE, orders, { spaces: 2 });

    res.json({
      success: true,
      orderId: orderId,
    });
const fileValidation = () => {
  if (!req.files) return false;

  const allowed = ["image/png", "image/jpeg", "image/webp"];

  return req.files.every(file =>
    allowed.includes(file.mimetype)
  );
};
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creando pedido" });
  }
};

// 📥 obtener pedidos
const getOrders = async (req, res) => {
  try {
    if (!(await fs.pathExists(DATA_FILE))) {
      return res.json([]);
    }

    const orders = await fs.readJson(DATA_FILE);
    res.json(orders);

  } catch (err) {
    res.status(500).json({ error: "Error leyendo pedidos" });
  }
};

module.exports = {
  createOrder,
  getOrders,
};