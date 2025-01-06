import React from 'react';
import { Book, Star, Users } from 'lucide-react';
import { Skill, SkillLevel } from '../../types/skill';

interface SkillCardProps {
  skill: Skill;
  onSwapRequest?: () => void;
}

const levelColors: Record<SkillLevel, string> = {
  beginner: 'bg-green-900/30 text-green-400',
  intermediate: 'bg-blue-900/30 text-blue-400',
  advanced: 'bg-purple-900/30 text-purple-400',
  expert: 'bg-red-900/30 text-red-400',
};

export function SkillCard({ skill, onSwapRequest }: SkillCardProps) {
  return (
    <div className="bg-netflix-card hover:bg-netflix-hover transition-colors rounded-lg p-4 border border-netflix-border">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-lg text-netflix-text">{skill.name}</h3>
          <span className={`inline-block px-2 py-1 rounded-full text-xs ${levelColors[skill.level]}`}>
            {skill.level}
          </span>
        </div>
        {onSwapRequest && (
          <button
            onClick={onSwapRequest}
            className="rounded-full bg-netflix-button hover:bg-netflix-buttonHover px-4 py-2 text-netflix-text text-sm transition-colors"
          >
            Request Swap
          </button>
        )}
      </div>
      
      <p className="text-netflix-muted mt-2">{skill.description}</p>
      
      <div className="flex items-center gap-4 mt-4 text-sm text-netflix-muted">
        <div className="flex items-center gap-1">
          <Book className="h-4 w-4" />
          <span>{skill.category}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4" />
          <span>4.5/5</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>12 swaps</span>
        </div>
      </div>
    </div>
  );
}