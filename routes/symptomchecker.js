const {
  symptomChecker,
  getPreviousSymptom,
} = require("../controllers/symptomchecker");
const express = require("express");
const router = express.Router();
const validationMiddleware = require("../middleware/validation");
const symptomCheckerSchema = require("../validations/symptomchecker");
const Authentication = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");
router.post(
  "/",
  validationMiddleware(symptomCheckerSchema),
  Authentication,
  Authorization,
  symptomChecker
);

router.get("/", Authentication, Authorization, getPreviousSymptom);
module.exports = router;
