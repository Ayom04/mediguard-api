const analyzeSymptoms = require("../services/syptomchecker");
const Symptom = require("../models/symptom");
const { v4: uuidv4 } = require("uuid");

const symptomChecker = async (req, res, next) => {
  const { message } = req.body;
  const { user_id } = req.params;
  try {
    const response = await analyzeSymptoms(message);
    const symptom = await Symptom.query().insert({
      prompt: message,
      symptom: response,
      user_id: user_id,
      symptom_id: uuidv4(),
    });

    delete symptom.created_at;
    delete symptom.updated_at;
    delete symptom.user_id;
    return res.status(200).json({
      status: "success",
      message: "Symptom checked successfully",
      data: {
        response,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getPreviousSymptom = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const symptoms = await Symptom.query()
      .where({ user_id })
      .select("prompt", "symptom", "created_at");
    return res.status(200).json({
      status: "success",
      message: "Symptoms retrieved successfully",
      data: {
        symptoms,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { symptomChecker, getPreviousSymptom };
