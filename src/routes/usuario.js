const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/usuarios");
const router = express.Router();

// User routes
router.post("/register", registerUser);
router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/search", getUsers);

router.post("/login", loginUser);

module.exports = router;
