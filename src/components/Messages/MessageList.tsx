import React from 'react';
import { Message } from '../../types/message';
import { MessageBubble } from './MessageBubble';
import { useStore } from '../../store';

interface MessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function MessageList({ messages, messagesEndRef }: MessageListProps) {
  const { currentUser } = useStore();

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isCurrentUser={message.senderId === currentUser?.id}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}