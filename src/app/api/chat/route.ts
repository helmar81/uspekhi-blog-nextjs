import { NextResponse } from 'next/server';
import { ai } from '../../../ai/genkit';

const getKnowledgeContext = () => '';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided.' }, { status: 400 });
    }

    // Get the latest query from the user
    const lastUserMessage = messages[messages.length - 1]?.content || '';

    // Load site blog posts & markdown content
    const siteContent = getKnowledgeContext();

    const systemPrompt = `
You are the official AI assistant for Uspekhi (uspekhi.web.app), created by Helmar Baechle.
You specialize in full-stack web development, modern web technologies (Next.js, React, Astro, Svelte, SvelteKit, Angular), AI tools, and automation workflows.

Knowledge Base (Site Content & Blog Posts):
${siteContent || 'No markdown documentation available.'}

Instructions:
1. Answer general web development, framework, and AI programming questions directly and helpfully.
2. If the user asks about Uspekhi, Helmar Baechle, or blog post topics, prioritize information from the Knowledge Base above.
3. Keep responses concise, clear, and professional.
`;

    // Call Genkit AI model
    const response = await ai.generate({
      model: 'googleai/gemini-3.8-flash',
      prompt: `${systemPrompt}\n\nUser Question: ${lastUserMessage}`,
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.error('Chat Route API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request. Please try again.' },
      { status: 500 }
    );
  }
}