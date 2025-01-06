import { User } from './user';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type SkillCategory = 'technology' | 'language' | 'arts' | 'music' | 'business' | 'fitness' | 'other';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  description: string;
  userId: string;
  createdAt: string;
}

export interface SkillSwap {
  id: string;
  offeredSkillId: string;
  requestedSkillId: string;
  teacherId: string;
  studentId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
  completedAt?: string;
  rating?: number;
  review?: string;
}

export interface SkillMatch {
  skill: Skill;
  user: User;
  matchScore: number;
  distance?: number;
}