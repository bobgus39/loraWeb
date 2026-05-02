const express = require("express");
const router = express.Router();

const multer = require("multer");
const validateOrder = require("../middlewares/validateOrder");

const {
  createOrder,
  getOrders,
  updateOrderStatus,
} = require("../controllers/ordersController");

// ✅ Multer en memoria (correcto)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 50,
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/png", "image/jpeg", "image/webp"];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Formato no permitido"), false);
    }

    cb(null, true);
  },
});

// 📦 crear pedido
router.post(
  "/",
  (req, res, next) => {
    console.log("👉 PASA POR ROUTE");
    next();
  },
  upload.array("images"),
  (req, res, next) => {
    console.log("👉 PASA POR MULTER");
    next();
  },
  validateOrder,
  (req, res, next) => {
    console.log("👉 PASA POR VALIDATE");
    next();
  },
  createOrder
);

// 📥 obtener pedidos
router.get("/", getOrders);

// 🔄 actualizar estado
router.put("/:id", updateOrderStatus);

module.exports = router;