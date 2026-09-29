import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { getKnowledgeContext } from '@/lib/getKnowledgeContext';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is missing in environment variables.');
      return NextResponse.json(
        { error: 'API key configuration missing.' },
        { status: 500 }
      );
    }

    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1]?.content || '';

    // Load knowledge context safely
    let knowledgeBase = '';
    try {
      knowledgeBase = getKnowledgeContext();
    } catch (e) {
      console.warn('Could not load knowledge context:', e);
    }

    const systemInstruction = `
      You are a helpful AI assistant for the website uspekhi.web.app.
      Answer user questions clearly and concisely using the provided knowledge base below.
      If the user's question cannot be answered using the provided knowledge, politely let them know.

      --- KNOWLEDGE BASE ---
      ${knowledgeBase}
    `;

    // Initialize SDK with Google GenAI
    const ai = new GoogleGenAI({ apiKey });

    // Call gemini-3.8-flash (supported by @google/genai SDK v1beta)
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: lastUserMessage,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    const replyText = response.text || 'No response generated.';
    return NextResponse.json({ reply: replyText });

  } catch (error: any) {
    console.error('Full Chat Route Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}