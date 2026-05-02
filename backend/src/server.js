require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { initDB } = require("./db/initDb");
const ordersRoutes = require("./routes/orders");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/orders", ordersRoutes);

const PORT = process.env.PORT || 5000;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running`);
  });
});