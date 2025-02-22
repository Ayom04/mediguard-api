const analyzeSymptoms = require("../services/syptomchecker");

const symptomChecker = async (req, res, next) => {
  const { message } = req.body;
  try {
    const response = await analyzeSymptoms(message);
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

module.exports = symptomChecker;
