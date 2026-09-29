'use client';

import { useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

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

      // Handle non-OK HTTP status gracefully (prevents JSON syntax errors)
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Server error (${res.status}):`, errorText);
        setMessages([
          ...newMessages,
          { role: 'assistant', content: 'Sorry, the chat service is currently unavailable. Please try again in a moment.' },
        ]);
        return;
      }

      const data = await res.json();
      const reply = data.reply || data.error || 'No response received.';
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('Network/Client Error:', err);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Network error. Please check your connection and try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-50"
        aria-label="Open chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white border rounded-lg shadow-2xl flex flex-col overflow-hidden z-50">
      <div className="bg-blue-600 p-3 text-white flex justify-between items-center">
        <h3 className="font-semibold text-sm">Chat</h3>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-white/80 hover:text-white transition-colors"
          aria-label="Close chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-4 text-black flex-1">
        <div className="h-64 overflow-y-auto mb-3 space-y-2 text-sm pr-1">
          {messages.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'text-right font-semibold' : 'text-left text-gray-700'}>
              <p className={`inline-block px-3 py-2 rounded-lg ${m.role === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100'}`}>
                {m.content}
              </p>
            </div>
          ))}
          {loading && <p className="text-xs text-gray-400">Thinking...</p>}
        </div>
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={loading}
            className="flex-1 border p-2 text-sm rounded outline-none focus:border-blue-500 disabled:bg-gray-50"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}