// src/app/api/chat/route.ts
import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { getKnowledgeContext } from '@/lib/getKnowledgeContext';

const ai = new GoogleGenAI(); // Automatically uses process.env.GEMINI_API_KEY

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Extract user query
    const lastUserMessage = messages[messages.length - 1]?.content || '';

    // Load knowledge files dynamically
    const knowledgeBase = getKnowledgeContext();

    const systemInstruction = `
      You are a helpful AI assistant for the website uspekhi.web.app.
      Answer user questions clearly and concisely using the provided knowledge base below.
      If the user's question cannot be answered using the provided knowledge, politely let them know that you don't have that specific information yet.

      --- KNOWLEDGE BASE ---
      ${knowledgeBase}
    `;

    // Call Gemini 2.5 Flash
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: lastUserMessage,
      config: {
        systemInstruction,
        temperature: 0.3, // Lower temperature keeps answers strictly grounded
      },
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}