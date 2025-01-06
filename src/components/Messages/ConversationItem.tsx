import React from 'react';
import type { User } from '../../types';
import type { Message } from '../../types/message';

interface ConversationItemProps {
  user: User;
  lastMessage?: Message;
  isSelected: boolean;
  onClick: () => void;
}

export function ConversationItem({ user, lastMessage, isSelected, onClick }: ConversationItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 text-left hover:bg-linkedin-hover transition-colors ${
        isSelected ? 'bg-linkedin-hover' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <img
          src={user.avatar}
          alt=""
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-linkedin-text">{user.name}</div>
          {lastMessage && (
            <p className="text-sm text-linkedin-muted truncate">
              {lastMessage.content}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}