import React from 'react';
import { ArrowRight, Clock, Star } from 'lucide-react';
import { SkillSwap } from '../../types/skill';
import { useStore } from '../../store';

interface SkillSwapCardProps {
  swap: SkillSwap;
}

export function SkillSwapCard({ swap }: SkillSwapCardProps) {
  const { skills, users, acceptSwap, completeSwap } = useStore();
  
  const offeredSkill = skills.find((s) => s.id === swap.offeredSkillId);
  const requestedSkill = skills.find((s) => s.id === swap.requestedSkillId);
  const teacher = users.find((u) => u.id === swap.teacherId);
  const student = users.find((u) => u.id === swap.studentId);

  if (!offeredSkill || !requestedSkill || !teacher || !student) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <img src={teacher.avatar} alt="" className="w-8 h-8 rounded-full" />
            <span className="font-medium">{offeredSkill.name}</span>
          </div>
        </div>

        <ArrowRight className="h-5 w-5 text-gray-400" />

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <img src={student.avatar} alt="" className="w-8 h-8 rounded-full" />
            <span className="font-medium">{requestedSkill.name}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{new Date(swap.createdAt).toLocaleDateString()}</span>
        </div>

        {swap.status === 'pending' && (
          <button
            onClick={() => acceptSwap(swap.id)}
            className="rounded-full bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-2 text-white text-sm hover:opacity-90 transition-opacity"
          >
            Accept Swap
          </button>
        )}

        {swap.status === 'accepted' && (
          <button
            onClick={() => completeSwap(swap.id, 5)}
            className="rounded-full bg-green-500 px-4 py-2 text-white text-sm hover:opacity-90 transition-opacity"
          >
            Complete
          </button>
        )}

        {swap.status === 'completed' && (
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span>{swap.rating}/5</span>
          </div>
        )}
      </div>
    </div>
  );
}