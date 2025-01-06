import React, { useState } from 'react';
import { User } from '../types';

interface UserCreateProps {
  onCreateUser: (user: Omit<User, 'id'>) => void;
  onCancel: () => void;
}

export function UserCreate({ onCreateUser, onCancel }: UserCreateProps) {
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    bio: '',
    location: '',
    website: '',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateUser({ ...userData, following: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          required
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          required
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          value={userData.bio}
          onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          value={userData.location}
          onChange={(e) => setUserData({ ...userData, location: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Website</label>
        <input
          type="url"
          value={userData.website}
          onChange={(e) => setUserData({ ...userData, website: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
        <input
          type="url"
          value={userData.avatar}
          onChange={(e) => setUserData({ ...userData, avatar: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-4 py-2 text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
        >
          Create User
        </button>
      </div>
    </form>
  );
}