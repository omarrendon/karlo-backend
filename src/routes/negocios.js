const express = require("express");
const {
  createBussines,
  getAllBussines,
  deleteBussiness,
  searchBussiness,
  updateBussiness,
} = require("../controllers/negocios");
const router = express.Router();

router.get("/", getAllBussines);
router.get("/search", searchBussiness);
router.post("/register", createBussines);
router.put("/:id", updateBussiness);
router.delete("/:id", deleteBussiness);

module.exports = router;
