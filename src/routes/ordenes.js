const express = require("express");
const {
  createOrder,
  getOrders,
  updateOrderStatus,
  payOrder,
  deleteOrder,
  searchOrderById,
} = require("../controllers/ordenes");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();

// Rutas de órdenes
router.post("/", authenticateToken, createOrder);
router.get("/search", authenticateToken, searchOrderById);
router.get("/", authenticateToken, getOrders);
router.delete("/:id", authenticateToken, deleteOrder);
router.put("/:id/status", authenticateToken, updateOrderStatus);
router.put("/pay/:id", authenticateToken, payOrder);

module.exports = router;
