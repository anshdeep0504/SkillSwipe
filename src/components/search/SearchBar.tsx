import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { NewsSection } from '../news/NewsSection';
import { useStore } from '../../store';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const { users, skills } = useStore();

  const filteredResults = query ? {
    users: users.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.bio?.toLowerCase().includes(query.toLowerCase())
    ),
    skills: skills.filter(skill =>
      skill.name.toLowerCase().includes(query.toLowerCase()) ||
      skill.description.toLowerCase().includes(query.toLowerCase())
    )
  } : null;

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search skills, users, or news..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none"
        />
      </div>

      {filteredResults && (
        <div className="mb-6 space-y-2">
          {filteredResults.users.length > 0 && (
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Users</h3>
              {filteredResults.users.slice(0, 3).map(user => (
                <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                  <img src={user.avatar} alt="" className="w-8 h-8 rounded-full" />
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.bio?.slice(0, 50)}...</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredResults.skills.length > 0 && (
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Skills</h3>
              {filteredResults.skills.slice(0, 3).map(skill => (
                <div key={skill.id} className="p-2 hover:bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">{skill.name}</div>
                  <div className="text-sm text-gray-500">{skill.description.slice(0, 50)}...</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <NewsSection />
    </div>
  );
}