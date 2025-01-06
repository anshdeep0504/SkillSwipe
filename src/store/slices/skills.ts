import { StateCreator } from 'zustand';
import { AppState } from '../../types';
import { Skill, SkillSwap } from '../../types/skill';

export interface SkillsSlice {
  skills: Skill[];
  swaps: SkillSwap[];
  addSkill: (skill: Omit<Skill, 'id' | 'createdAt'>) => void;
  removeSkill: (skillId: string) => void;
  proposeSwap: (offeredSkillId: string, requestedSkillId: string) => void;
  acceptSwap: (swapId: string) => void;
  completeSwap: (swapId: string, rating: number, review?: string) => void;
}

export const createSkillsSlice: StateCreator<AppState, [], [], SkillsSlice> = (set) => ({
  skills: [],
  swaps: [],

  addSkill: (skillData) =>
    set((state) => ({
      skills: [
        ...state.skills,
        {
          ...skillData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
      ],
    })),

  removeSkill: (skillId) =>
    set((state) => ({
      skills: state.skills.filter((skill) => skill.id !== skillId),
    })),

  proposeSwap: (offeredSkillId, requestedSkillId) =>
    set((state) => {
      if (!state.currentUser) return state;

      const requestedSkill = state.skills.find((s) => s.id === requestedSkillId);
      if (!requestedSkill) return state;

      const newSwap: SkillSwap = {
        id: crypto.randomUUID(),
        offeredSkillId,
        requestedSkillId,
        teacherId: state.currentUser.id,
        studentId: requestedSkill.userId,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      return {
        swaps: [...state.swaps, newSwap],
      };
    }),

  acceptSwap: (swapId) =>
    set((state) => ({
      swaps: state.swaps.map((swap) =>
        swap.id === swapId ? { ...swap, status: 'accepted' } : swap
      ),
    })),

  completeSwap: (swapId, rating, review) =>
    set((state) => ({
      swaps: state.swaps.map((swap) =>
        swap.id === swapId
          ? {
              ...swap,
              status: 'completed',
              completedAt: new Date().toISOString(),
              rating,
              review,
            }
          : swap
      ),
    })),
});