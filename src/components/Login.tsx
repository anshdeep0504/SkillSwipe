import React, { useState } from 'react';
import { useStore } from '../store';
import { User } from '../types';
import { UserCreate } from './UserCreate';
import { UserList } from './UserList';
import { Plus } from 'lucide-react';

export function Login() {
  const { users, login, createUser } = useStore();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateUser = (userData: Omit<User, 'id'>) => {
    const user = createUser(userData);
    login(user);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Choose Account</h1>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
          >
            <Plus className="h-5 w-5" />
            New Account
          </button>
        </div>

        {isCreating ? (
          <UserCreate
            onCreateUser={handleCreateUser}
            onCancel={() => setIsCreating(false)}
          />
        ) : (
          <UserList users={users} onSelectUser={(userId) => {
            const user = users.find(u => u.id === userId);
            if (user) login(user);
          }} />
        )}
      </div>
    </div>
  );
}