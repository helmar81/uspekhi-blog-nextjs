---
title: 'Implementing a Knowledge-Aware Gemini Chatbot in Next.js '
date: '2026-11-05'
--- 

### Chatbot Knowledgebase (Firebase Hosted)

This guide documents the complete setup process for embedding a dynamic, knowledge-grounded AI chatbot into a Next.js application deployed on Firebase.

---

## 1. Architecture Overview

- **Framework:** Next.js (App Router)
- **Deployment Platform:** Firebase App Hosting / Cloud Functions
- **AI SDK:** `@google/genai`
- **Model:** `gemini-3.8-flash`
- **Context Injection:** In-app server-side dynamic markdown parser

---

## 2. API Key Setup & Security (Google Cloud Console)

To enable Gemini API access while satisfying GCP security requirements:

1. Navigate to **Google Cloud Console** > **APIs & Services** > **Credentials**.
2. Create or select an API key.
3. Restrict the key to the **Gemini API** (`generativelanguage.googleapis.com`).
4. Bind the key to the project service account (`uspekhi@appspot.gserviceaccount.com`).
5. Store the key securely in `.env.local` for local development:

```env
GEMINI_API_KEY=AIzaSy...
```

For production, ensure `GEMINI_API_KEY` is added to your Firebase App Hosting environment variables or Secrets Manager.

---

## 3. Package Installation

Install the official Google Gen AI SDK:

```bash
npm install @google/genai
```

---

## 4. Implementation Code

### File 1: Knowledge Parsing Helper (`src/lib/getKnowledgeContext.ts`)

This module reads markdown files from target directories (`/posts`, `/src/app/about`, etc.) at runtime on the server and concatenates them into system instructions.

```typescript
import fs from 'fs';
import path from 'path';

export function getKnowledgeContext(): string {
  const directoriesToRead = [
    path.join(process.cwd(), 'posts'),
    path.join(process.cwd(), 'src/app/about'),
  ];

  let combinedContent = '';

  directoriesToRead.forEach((dir) => {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const filePath = path.join(dir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        combinedContent += `\n--- Document: ${file} ---\n${fileContent}\n`;
      }
    });
  });

  return combinedContent;
}
```

---

### File 2: Backend Route Handler (`src/app/api/chat/route.ts`)

This API route handles incoming chat queries, loads local context dynamically, and queries the `gemini-3.8-flash` model.

```typescript
import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { getKnowledgeContext } from '@/lib/getKnowledgeContext';

const ai = new GoogleGenAI(); // Automatically consumes process.env.GEMINI_API_KEY

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1]?.content || '';

    // Load knowledge context from local markdown files
    const knowledgeBase = getKnowledgeContext();

    const systemInstruction = `
      You are a helpful AI assistant for the website uspekhi.web.app.
      Answer user questions clearly and concisely using the provided knowledge base below.
      If the user's question cannot be answered using the provided knowledge, politely let them know that you don't have that specific information yet.

      --- KNOWLEDGE BASE ---
      ${knowledgeBase}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: lastUserMessage,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}
```

---

### File 3: Client Chat Widget (`src/components/ChatWidget.tsx`)

A React component providing a simple popup or embedded user interface.

```tsx
'use client';

import { useState } from 'react';

export default function ChatWidget() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user' as const, content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border rounded-lg shadow-lg p-4 text-black z-50">
      <div className="h-64 overflow-y-auto mb-2 space-y-2 text-sm">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right font-semibold' : 'text-left text-gray-700'}>
            <p className="inline-block px-2 py-1 rounded bg-gray-100">{m.content}</p>
          </div>
        ))}
        {loading && <p className="text-xs text-gray-400">Thinking...</p>}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 border p-1 text-sm rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
          Send
        </button>
      </form>
    </div>
  );
}
```

---

## 5. Maintenance & Future Updates

- **Adding FAQs or new content:** Add any `.md` or `.mdx` file to the `posts/` folder or `src/app/about/` folder. The `getKnowledgeContext` helper will pick it up automatically without needing code changes.
- **Scaling Context:** If your total documentation grows beyond ~100k tokens, transition to Google Cloud Storage + Vertex AI Search Data Stores (Gemini Enterprise Agent Platform) for indexed RAG retrieval.