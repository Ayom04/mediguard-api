const { OpenAI } = require("openai");

// Initialize OpenAI with DeepSeek configuration
const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  // base_url: "https://api.deepseek.com",
});

/**
 * Analyzes user symptoms and provides potential health insights
 * @param {string} symptoms - User's described symptoms
 * @returns {Promise<string>} Analysis response
 */
const analyzeSymptoms = async (symptoms) => {
  const systemPrompt = `You are a symptom analysis assistant. Analyze symptoms, list common conditions, rate urgency (Non-urgent, Semi-urgent, Urgent), give recommendations, and include a disclaimer. Start with the disclaimer and end with a consultation note.`;

  const userPrompt = `Analyze these symptoms: ${symptoms}. Use this format:
  ---
  MEDICAL DISCLAIMER: Not medical advice—consult a healthcare professional.
  
  SYMPTOM ANALYSIS:
  [List and analyze symptoms]
  
  POSSIBLE CONDITIONS:
  [List common conditions]
  
  URGENCY:
  [Non-urgent, Semi-urgent, or Urgent, with explanation]
  
  RECOMMENDATIONS:
  [Basic suggestions]
  
  IMPORTANT: See a healthcare professional. Seek immediate help if severe.
  ---`;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      store: true,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7, // Balanced between creativity and consistency
      max_tokens: 1000, // Adjust based on needed response length
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    return "Error analyzing symptoms. Please try again or consult a healthcare professional directly.";
  }
};

// Example usage:
/*
const symptoms = "I've been experiencing a throbbing headache for the past 2 days, " +
                "along with mild fever and fatigue. The pain is worse in the morning.";

analyzeSymptoms(symptoms)
  .then(analysis => console.log(analysis))
  .catch(error => console.error(error));
*/

module.exports = analyzeSymptoms;
