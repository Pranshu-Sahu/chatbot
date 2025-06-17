// src/app/chat/page.tsx
'use client';

import { useState, useRef, FormEvent } from 'react';
import { v4 as uuid } from 'uuid';
import MessageList from '@/components/MessageList';

// 1️⃣ Type for each chat message
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

// 1️⃣ Type for the API response
interface ChatResponse {
  reply: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const userMsg: Message = {
      id: uuid(),
      text: input,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text }),
      });

      // 3️⃣ Cast into ChatResponse instead of any
      const data = (await res.json()) as ChatResponse;

      const botMsg: Message = {
        id: uuid(),
        text: data.reply,
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMsg]);

      // auto-focus after response
      inputRef.current?.focus();
    } catch (err: unknown) {
      // 4️⃣ Narrow unknown instead of using any
      if (err instanceof Error) {
        console.error('Chat error:', err.message);
        setError(err.message);
      } else {
        console.error('Chat error (non-Error):', err);
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <MessageList messages={messages} />
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-auto flex">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded-l"
          placeholder="Type a message…"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">
          Send
        </button>
      </form>
    </div>
  );
}
