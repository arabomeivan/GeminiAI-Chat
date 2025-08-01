import axios from "axios";

const GEMINI_API_URL = import.meta.env.VITE_GEMINI_API_URL;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const fetchGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
    );
    return (
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response."
    );
  } catch (error) {
    console.error("Gemini Axios Error:", error);
    return "Error fetching response.";
  }
};
