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
    if (!text.trim()) return;
    // 1. Add user message
    const userMsg: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);

    // 2. TODO: call your chat API / dummy backend
    
const botReply: Message = {
  id: (Date.now()+1).toString(),
  text: 'Typing...',
  sender: 'bot'
};
    // simulate response
    setTimeout(() => {
      setMessages(prev =>
        prev.map(m =>
          m.id === botReply.id
            ? { ...m, text: 'Hello! This is a dummy response.' }
            : m
        )
      );
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800">
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