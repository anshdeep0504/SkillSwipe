import React from 'react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  onSelectUser: (userId: string) => void;
}

export function UserList({ users, onSelectUser }: UserListProps) {
  return (
    <div className="space-y-2">
      {users.map((user) => (
        <button
          key={user.id}
          onClick={() => onSelectUser(user.id)}
          className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-gray-50"
        >
          <img src={user.avatar} alt="" className="h-12 w-12 rounded-full" />
          <div>
            <div className="font-bold">{user.name}</div>
            <div className="text-sm text-gray-500">@{user.username}</div>
            {user.bio && <div className="text-sm text-gray-600">{user.bio}</div>}
          </div>
        </button>
      ))}
    </div>
  );
}