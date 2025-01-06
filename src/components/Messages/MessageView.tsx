import React, { useEffect, useRef } from 'react';
import { useStore } from '../../store';
import { MessageForm } from './MessageForm';
import { formatTime } from '../../utils/dateUtils';

interface MessageViewProps {
  selectedUserId: string;
}

export function MessageView({ selectedUserId }: MessageViewProps) {
  const { currentUser, users, messages, markMessageAsRead } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const selectedUser = users.find(user => user.id === selectedUserId);
  
  const conversation = messages.filter(
    message =>
      (message.senderId === currentUser?.id && message.receiverId === selectedUserId) ||
      (message.senderId === selectedUserId && message.receiverId === currentUser?.id)
  ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  useEffect(() => {
    // Mark messages as read
    conversation
      .filter(msg => msg.receiverId === currentUser?.id && !msg.read)
      .forEach(msg => markMessageAsRead(msg.id));
      
    // Scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, currentUser?.id, markMessageAsRead]);

  if (!selectedUser) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <img
          src={selectedUser.avatar}
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-bold">{selectedUser.name}</h3>
          <p className="text-sm text-gray-500">@{selectedUser.username}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.map((message, index) => {
          const isCurrentUser = message.senderId === currentUser?.id;
          const showAvatar = index === 0 || 
            conversation[index - 1].senderId !== message.senderId;

          return (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${
                isCurrentUser ? 'flex-row-reverse' : ''
              }`}
            >
              {showAvatar && !isCurrentUser && (
                <img
                  src={selectedUser.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  isCurrentUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${
                  isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(new Date(message.createdAt))}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Form */}
      <MessageForm receiverId={selectedUserId} />
    </div>
  );
}