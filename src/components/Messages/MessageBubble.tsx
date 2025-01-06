import React from 'react';
import { Trash2, Check, CheckCheck } from 'lucide-react';
import { Message } from '../../types/message';
import { useStore } from '../../store';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

export function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  const { deleteMessage } = useStore();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this message?')) {
      deleteMessage(message.id);
    }
  };

  return (
    <div className={`group flex items-end gap-2 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
      <div className="relative max-w-[70%]">
        <div
          className={`rounded-2xl px-4 py-2 ${
            isCurrentUser
              ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          <p className="break-words">{message.content}</p>
          <div className={`flex items-center justify-end gap-1 mt-1 text-xs ${
            isCurrentUser ? 'text-white/70' : 'text-gray-500'
          }`}>
            <span>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            {isCurrentUser && (
              message.read ? <CheckCheck className="w-4 h-4" /> : <Check className="w-4 h-4" />
            )}
          </div>
        </div>
        {isCurrentUser && (
          <button
            onClick={handleDelete}
            className="absolute -right-8 top-0 p-1 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded-full text-red-500 transition-opacity"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}