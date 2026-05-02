const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (buffer, orderId) => {
  return new Promise((resolve, reject) => {
    console.log("📤 Subiendo imagen a Cloudinary...");

    cloudinary.uploader.upload_stream(
      {
        folder: `lora-orders/${orderId}`,
      },
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary error:", error);
          return reject(error);
        }

        console.log("✅ Subida OK:", result.secure_url);
        resolve(result.secure_url);
      }
    ).end(buffer);
  });
};

module.exports = { uploadToCloudinary };