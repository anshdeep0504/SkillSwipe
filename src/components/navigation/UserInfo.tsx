import React from 'react';
import type { User } from '../../types';

interface UserInfoProps {
  user: User;
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="group relative flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
      <img src={user.avatar} alt="" className="h-7 w-7 rounded-lg object-cover" />
      <div className="absolute left-full ml-2 px-2 py-1 bg-white text-gray-900 text-sm rounded shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
        {user.name}
      </div>
    </div>
  );
}