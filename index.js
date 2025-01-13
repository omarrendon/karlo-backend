const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./models/index");

// Carga las variables de entorno
dotenv.config();

// Inicializa la aplicación de Express
const app = express();

// Middleware para procesar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const businessRoutes = require("./src/routes/negocios");
const userRoutes = require("./src/routes/usuario");
const productRoutes = require("./src/routes/productos");
const orderRoutes = require("./src/routes/ordenes");
const authRoutes = require("./src/routes/auth");

app.use("/api/auth", authRoutes);
app.use("/api/bussiness", businessRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
