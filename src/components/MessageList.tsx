import MessageItem, { Message } from './MessageItem';

export default function MessageList({ messages }: { messages: Message[] }) {
  return (
    <>
      {messages.map(msg => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </>
  );
}
