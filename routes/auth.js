const express = require("express");
router = express.Router();
const login = require("../controllers/auth");
const validationMiddleware = require("../middleware/validation");
const { loginSchema } = require("../validations/user");

router.post("/login", validationMiddleware(loginSchema), login);

module.exports = router;
