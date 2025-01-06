import React from 'react';
import { Filter } from 'lucide-react';
import { useStore } from '../../store';

interface ChatHeaderProps {
  userId: string;
}

export function ChatHeader({ userId }: ChatHeaderProps) {
  const { users } = useStore();
  const user = users.find(u => u.id === userId);

  if (!user) return null;

  return (
    <div className="p-4 border-b border-linkedin-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-semibold text-linkedin-text">{user.name}</div>
            <div className="text-sm text-linkedin-muted">{user.bio?.split('|')[0]}</div>
          </div>
        </div>
        <button className="p-2 hover:bg-linkedin-hover rounded-full">
          <Filter className="w-5 h-5 text-linkedin-muted" />
        </button>
      </div>
    </div>
  );
}