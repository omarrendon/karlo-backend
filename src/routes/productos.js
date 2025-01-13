const express = require("express");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/productos");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();

router.post("/", authenticateToken, createProduct);
router.get("/", authenticateToken, getProducts);
router.get("/search", authenticateToken, getProduct);
router.put("/:id", authenticateToken, updateProduct);
router.delete("/:id", authenticateToken, deleteProduct);

module.exports = router;
