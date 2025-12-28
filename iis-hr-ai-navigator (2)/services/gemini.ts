import { GoogleGenAI, Type } from "@google/genai";
import { HRContact } from "../types";
import { IIS_HR_CONTACTS, SYSTEM_PROMPT } from "../constants";

export async function processQuery(query: string, history: {role: string, content: string}[]) {
  // 從注入的環境變數中讀取 API Key
  const apiKey = process.env.API_KEY || "";
  
  if (!apiKey) {
    return {
      response: "API Key is missing. Please set API_KEY in your Vercel Environment Variables.\n密鑰遺失，請在 Vercel 環境變數中設定 API_KEY。",
      foundContact: undefined
    };
  }

  // 每次查詢時初始化，確保使用最新的環境變數
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }]
        })),
        { role: 'user', parts: [{ text: query }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            responseMessage: {
              type: Type.STRING,
              description: "The professional response in the same language as the user query."
            },
            matchedName: {
              type: Type.STRING,
              description: "The full name of the HR staff member from the database if identified, otherwise an empty string."
            }
          },
          required: ["responseMessage", "matchedName"]
        }
      }
    });

    const data = JSON.parse(response.text.trim());

    let foundContact: HRContact | undefined = undefined;
    if (data.matchedName) {
      foundContact = IIS_HR_CONTACTS.find(c => 
        c.name.toLowerCase().includes(data.matchedName.toLowerCase()) ||
        data.matchedName.toLowerCase().includes(c.name.toLowerCase())
      );
    }

    return {
      response: data.responseMessage,
      foundContact
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      response: "I'm sorry, I'm having trouble processing your request. Please contact humanresourcesoffice@iis.kh.edu.tw directly.\n抱歉，系統處理出現問題。請直接透過郵件聯絡人事室：humanresourcesoffice@iis.kh.edu.tw。",
      foundContact: undefined
    };
  }
}
