// src/components/MessageList.tsx

import MessageItem from './MessageItem';
import { Message } from './ChatContainer';    // ← pull the type from ChatContainer, where you actually declared it

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <>
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </>
  );
}
