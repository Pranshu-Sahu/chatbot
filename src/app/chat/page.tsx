'use client';

import ChatContainer from '@/components/ChatContainer';

export default function ChatPage() {
  return (
    // Give it full viewport height so the chat can scroll
    <div className="h-screen">
      <ChatContainer />
    </div>
  );
}
