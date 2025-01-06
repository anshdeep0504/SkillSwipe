import React, { useState } from 'react';
import { useStore } from '../store';

export function ProfileEdit() {
  const currentUser = useStore((state) => state.currentUser);
  const updateProfile = useStore((state) => state.updateProfile);
  const [profile, setProfile] = useState({
    name: currentUser.name,
    bio: currentUser.bio || '',
    location: currentUser.location || '',
    website: currentUser.website || '',
    avatar: currentUser.avatar,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          value={profile.location}
          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Website</label>
        <input
          type="url"
          value={profile.website}
          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
        <input
          type="url"
          value={profile.avatar}
          onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
      >
        Save Profile
      </button>
    </form>
  );
}