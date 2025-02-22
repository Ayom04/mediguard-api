const express = require("express");
const router = express.Router();
const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/user");
const validationMiddleware = require("../middleware/validation");
const { registerSchema } = require("../validations/user");

router.post("/", validationMiddleware(registerSchema), createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
