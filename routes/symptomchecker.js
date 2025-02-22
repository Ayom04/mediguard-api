const symptomChecker = require("../controllers/symptomchecker");
const express = require("express");
const router = express.Router();
const validationMiddleware = require("../middleware/validation");
const symptomCheckerSchema = require("../validations/symptomchecker");

router.post(
  "/symptomchecker",
  validationMiddleware(symptomCheckerSchema),
  symptomChecker
);

module.exports = router;
