const fs = require("fs-extra");
const path = require("path");

const uploadDir = process.env.UPLOAD_DIR || "uploads";

const createOrderFolder = async (orderId) => {
  const dir = path.join(uploadDir, orderId);
  await fs.ensureDir(dir);
  return dir;
};

module.exports = {
  createOrderFolder,
};