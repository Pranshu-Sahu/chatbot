'use client';

import { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  const sendMessage = async (text: string) => {
     console.log('sendMessage called with:', text);
    if (!text.trim()) return;

    // 1️⃣ Add user message
    const userMsg: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);

    // 2️⃣ Call chat API
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();

      // 3️⃣ Add bot reply
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'No response',
        sender: 'bot',
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat API error:', err);
      const errorMsg: Message = {
        id: (Date.now() + 2).toString(),
        text: 'Error: Could not get response',
        sender: 'bot',
      };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-800">
      <div ref={listRef} className="flex-1 overflow-auto p-4">
        <MessageList messages={messages} />
      </div>
      <div className="p-4 border-t bg-white dark:bg-gray-700">
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}

export default ChatContainer;
