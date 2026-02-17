
import { GoogleGenAI } from "@google/genai";

export const getWellnessInsight = async (userName: string, streak: number, quests: string[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User ${userName} has a ${streak} day streak. Quests completed: ${quests.join(", ") || "None yet"}.`,
      config: {
        systemInstruction: "You are the ZenQuest Oracle. Provide exactly one sentence of motivating wellness advice. Be extremely concise, poetic, and fast. No conversational filler.",
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 0 } // Speed optimization: disable thinking for simple tasks
      },
    });
    
    return response.text?.trim() || "Your journey continues with a single mindful breath.";
  } catch (error) {
    console.error("Gemini Speed Error:", error);
    return "The path to wellness is built one small step at a time.";
  }
};
