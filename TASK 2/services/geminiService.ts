
import { GoogleGenAI, Type } from "@google/genai";
import { Employee } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  /**
   * Generates a professional summary/bio for an employee based on their profile data.
   */
  async generateEmployeeBio(employee: Employee): Promise<string> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a professional 2-sentence bio for an employee with the following details:
        Name: ${employee.firstName} ${employee.lastName}
        Role: ${employee.role}
        Department: ${employee.department}
        Skills: ${employee.skills.join(', ')}
        Join Date: ${employee.joinDate}`,
        config: {
          temperature: 0.7,
        }
      });
      return response.text || 'No bio generated.';
    } catch (error) {
      console.error('Error generating bio:', error);
      return 'Failed to generate bio automatically.';
    }
  },

  /**
   * Analyzes the employee distribution and provides a quick HR insight.
   */
  async getHRInsights(employees: Employee[]): Promise<string> {
    try {
      const summary = employees.map(e => `${e.role} in ${e.department}`).join(', ');
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a senior HR consultant. Analyze this workforce list and provide one short, actionable strategic insight (max 40 words): ${summary}`,
        config: {
          temperature: 0.5,
        }
      });
      return response.text || 'Workforce looks stable.';
    } catch (error) {
      return 'AI Insights temporarily unavailable.';
    }
  }
};
