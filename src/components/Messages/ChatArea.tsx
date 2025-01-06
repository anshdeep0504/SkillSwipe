import React, { useRef, useEffect } from 'react';
import { useStore } from '../../store';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';

interface ChatAreaProps {
  userId: string;
}

export function ChatArea({ userId }: ChatAreaProps) {
  const { messages, currentUser } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationMessages = messages
    .filter(msg => 
      (msg.senderId === currentUser?.id && msg.receiverId === userId) ||
      (msg.senderId === userId && msg.receiverId === currentUser?.id)
    )
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages]);

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-white">
      <ChatHeader userId={userId} />
      <MessageList 
        messages={conversationMessages}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput receiverId={userId} />
    </div>
  );
}