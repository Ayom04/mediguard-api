const express = require("express");
const router = express.Router();
const {
  addMedicationRemainder,
  getMedicationReminders,
  sendReminder,
} = require("../controllers/medication_remainder");
const Authentication = require("../middleware/authentication");
const Authorization = require("../middleware/authorization");
const medicationRemainderSchema = require("../validations/medication_remainder");
const validationMiddleware = require("../middleware/validation");

router.post(
  "/",
  Authentication,
  Authorization,
  validationMiddleware(medicationRemainderSchema),
  addMedicationRemainder
);

// router.get("/pending", Authentication, Authorization, );

router.get("/", Authentication, Authorization, getMedicationReminders);
router.get("/omo", sendReminder);

module.exports = router;
