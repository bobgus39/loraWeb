const orderSchema = require("../validators/orderValidator");

const validateOrder = async (req, res, next) => {
  try {
    await orderSchema.validateAsync(req.body, {
  convert: true,
});

    next();

  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.details?.[0]?.message || "Validation error",
    });
  }
};

module.exports = validateOrder;