import { GoogleGenAI, Type, Schema } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

// Mock delay for realistic feel if API key is missing or for simulation
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateLeads = async (niche: string, subniche: string, count: number): Promise<any[]> => {
  if (!API_KEY) {
    console.warn("No API Key provided, returning mock data.");
    await wait(2000);
    return generateMockLeads(count, niche);
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const leadSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      brand_name: { type: Type.STRING },
      website_url: { type: Type.STRING },
      contact_name: { type: Type.STRING },
      contact_role: { type: Type.STRING },
      contact_email: { type: Type.STRING },
      verified_status: { type: Type.STRING, enum: ['valid', 'unknown'] },
      why_fit_note: { type: Type.STRING },
    },
    required: ['brand_name', 'website_url', 'contact_role', 'why_fit_note'],
  };

  const responseSchema: Schema = {
    type: Type.ARRAY,
    items: leadSchema,
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate ${count} realistic potential sponsor leads for a creator in the "${niche}" niche, specifically focusing on "${subniche}". 
      Include realistic contact names, roles (e.g. Marketing Director), and synthesize a plausible email address (e.g. first.last@company.com).
      Provide a "why_fit_note" explaining why they would sponsor this niche.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) return generateMockLeads(count, niche);
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return generateMockLeads(count, niche);
  }
};

const generateMockLeads = (count: number, niche: string) => {
  return Array.from({ length: count }).map((_, i) => ({
    brand_name: `Sponsor Brand ${i + 1}`,
    website_url: `https://brand${i + 1}.com`,
    contact_name: `Alex Marketer ${i + 1}`,
    contact_role: "Head of Partnerships",
    contact_email: `partnerships@brand${i + 1}.com`,
    verified_status: "valid",
    why_fit_note: `This brand frequently sponsors ${niche} content and has a high alignment with your audience demographics.`,
  }));
};
