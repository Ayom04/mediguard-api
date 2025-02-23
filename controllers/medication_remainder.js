const MedicationRemainder = require("../models/medication_remainder");
const { v4: uuidv4 } = require("uuid");

const addMedicationRemainder = async (req, res, next) => {
  const { user_id } = req.params;
  const { medication_name, medication_dose, repeat_interval } = req.body;
  try {
    const date = new Date();
    const medicationRemainder = await MedicationRemainder.query().insert({
      medication_remainder_id: uuidv4(),
      medication_name,
      medication_dose,
      repeat_interval,
      user_id,
      schedule: `${new Date().toISOString().split("T")[0]} ${new Date()
        .getHours()
        .toString()
        .padStart(2, "0")}:${new Date()
        .getMinutes()
        .toString()
        .padStart(2, "0")}`,
      medication_date: date.toISOString().split("T")[0],
      medication_time: `${new Date()
        .getHours()
        .toString()
        .padStart(2, "0")}:${new Date()
        .getMinutes()
        .toString()
        .padStart(2, "0")}`,
    });

    delete medicationRemainder.created_at;
    delete medicationRemainder.updated_at;
    delete medicationRemainder.user_id;

    return res.status(201).json({
      status: "success",
      message: "Medication reminder added successfully",
      data: {
        ...medicationRemainder,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMedicationReminders = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const medicationRemainders = await MedicationRemainder.query()
      .where({ user_id })
      .select(
        "medication_remainder_id",
        "medication_name",
        "medication_dose",
        "medication_time",
        "repeat_interval",
        "medication_date",
        "schedule"
      );
    return res.status(200).json({
      status: "success",
      message: "Medication reminders retrieved successfully",
      data: {
        medicationRemainders,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addMedicationRemainder,
  getMedicationReminders,
};
