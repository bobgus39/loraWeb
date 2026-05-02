const fs = require("fs-extra");
const path = require("path");
const cloudinary = require("../config/cloudinary");
const { uploadToCloudinary } = require("../services/cloudinaryService");
const { createOrderDB, getOrdersDB, updateOrderStatusDB } = require("../services/orderService");
const DATA_FILE = process.env.DATA_FILE || "../../data/orders.json";

const createOrder = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const {
      orderId,
      name,
      email,
      service,
      extras,
      description,
      price,
    } = req.body;

    // ☁️ AQUÍ ESTÁ LA MAGIA
    //const images = req.files.map(file => file.path); // URL cloudinary
const images = [];

if (req.files && req.files.length > 0) {
  for (const file of req.files) {
    const url = await uploadToCloudinary(file.buffer, orderId);
    images.push(url);
  }
}
    const order = {
      id: orderId,
      name,
      email,
      service,
      extras: typeof extras === "string" ? JSON.parse(extras) : extras,
      description,
      price: Number(price),
      images, // 👉 URLs reales
      status: "pending",
      createdAt: new Date(),
    };

    await createOrderDB(order, images);

    res.json({
      success: true,
      orderId,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await getOrdersDB();
    res.json(orders);

  } catch (err) {
    res.status(500).json({
      error: "Error obteniendo pedidos",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    await updateOrderStatusDB(
      req.params.id,
      req.body.status
    );

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({
      error: "Error actualizando estado",
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
};