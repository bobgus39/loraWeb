const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const fs = require("fs"); // ✅ FALTABA ESTO
const validateOrder = require("../middlewares/validateOrder");
const {
  createOrder,
  getOrders,
} = require("../controllers/ordersController");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
 const orderId = req.body.orderId || req.body.id;

  const dir = path.join(__dirname, "../../uploads", orderId);

  if (!req.body.orderId) {
  return cb(new Error("orderId requerido"), null);
}
  fs.mkdirSync(dir, { recursive: true });

  cb(null, dir);
},
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 📦 crear pedido
router.post(
  "/",
  upload.array("images"),   // 👈 PRIMERO multer
  validateOrder,            // 👈 DESPUÉS Joi
  createOrder
);

// 📥 obtener pedidos
router.get("/", getOrders);

router.put("/:id", async (req, res) => {
  const fs = require("fs-extra");
  const path = require("path");

  const filePath = path.join(__dirname, "../../data/orders.json");

  const { status } = req.body;
  const { id } = req.params;

  let orders = [];

  if (await fs.pathExists(filePath)) {
    orders = await fs.readJson(filePath);
  }

  orders = orders.map((order) =>
    order.id === id ? { ...order, status } : order
  );

  await fs.writeJson(filePath, orders, { spaces: 2 });

  res.json({ success: true });
});

module.exports = router;