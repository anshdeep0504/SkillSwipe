import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState } from '../types';
import { createSkillsSlice } from './slices/skills';
import { createUsersSlice } from './slices/users';
import { createLikesSlice } from './slices/likes';
import { createMessagesSlice } from './slices/messages';
import { createNotificationSlice } from './slices/notifications';
import { sampleUsers, sampleSkills } from '../data/sampleData';

// Initialize store with sample data only if no existing data
const initialState = {
  users: sampleUsers,
  skills: sampleSkills,
  messages: [],
  notifications: [],
  likes: [],
  currentUser: null
};

export const useStore = create(
  persist<AppState>(
    (...a) => ({
      ...createSkillsSlice(...a),
      ...createUsersSlice(...a),
      ...createLikesSlice(...a),
      ...createMessagesSlice(...a),
      ...createNotificationSlice(...a),
      ...initialState
    }),
    {
      name: 'skill-swap-storage',
      partialize: (state) => ({
        users: state.users,
        currentUser: state.currentUser,
        skills: state.skills,
        likes: state.likes,
        messages: state.messages.slice(-100), // Only store last 100 messages
        notifications: state.notifications.slice(-50) // Only store last 50 notifications
      })
    }
  )
);