import { Message } from './ChatContainer';

export default function MessageItem({ message }: { message: Message }) {
  const isUser = message.sender === 'user';
  return (
    <div className={`mb-2 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`
        max-w-xs px-4 py-2 rounded-2xl
        ${isUser
          ? 'bg-blue-500 text-white rounded-br-none'
          : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-100 rounded-bl-none'}
      `}>
        {message.text}
      </div>
    </div>
  );
}
