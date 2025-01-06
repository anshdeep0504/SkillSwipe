import React from 'react';
import { Star, GraduationCap, MapPin, Code } from 'lucide-react';
import type { User } from '../../types';
import type { Skill } from '../../types/skill';

interface UserCardProps {
  user: User;
  skill: Skill;
}

export function UserCard({ user, skill }: UserCardProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-bold">{user.name}</h3>
        {user.verified && (
          <Star className="w-6 h-6" fill="currentColor" />
        )}
      </div>
      <div className="flex items-center gap-2 text-sm">
        <GraduationCap className="w-4 h-4" />
        <span>{user.bio?.split('|')[1]?.trim()}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        <span>{user.location}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center gap-2">
          <Code className="w-5 h-5" />
          <span>{skill.name}</span>
        </div>
        <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
          {skill.level}
        </div>
      </div>

      <p className="text-white/90 line-clamp-2">
        {skill.description}
      </p>
    </div>
  );
}