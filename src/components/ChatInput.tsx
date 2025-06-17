'use client';

import { useState, KeyboardEvent } from 'react';

export default function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState('');

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(text);
      setText('');
    }
  };

  return (
    <textarea
      rows={1}
      className="w-full resize-none rounded-lg border px-3 py-2 focus:outline-none focus:ring"
      placeholder="Type a message..."
      value={text}
      onChange={e => setText(e.target.value)}
      onKeyDown={handleKey}
    />
  );
}
