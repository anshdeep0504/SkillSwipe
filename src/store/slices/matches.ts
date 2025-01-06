import { StateCreator } from 'zustand';
import { AppState } from '../types';
import { createNotification } from './utils';

export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  createdAt: string;
  lastMessageAt?: string;
}

export interface MatchesSlice {
  matches: Match[];
  addLike: (likedUserId: string) => void;
  checkMatch: (userId1: string, userId2: string) => boolean;
}

export const createMatchesSlice: StateCreator<AppState, [], [], MatchesSlice> = (set, get) => ({
  matches: [],

  addLike: (likedUserId) => 
    set((state) => {
      if (!state.currentUser) return state;

      // Check if the other user has already liked current user
      const isMatch = state.likes?.some(
        like => like.userId === likedUserId && like.likedUserId === state.currentUser?.id
      );

      if (isMatch) {
        // Create a new match
        const newMatch: Match = {
          id: crypto.randomUUID(),
          user1Id: state.currentUser.id,
          user2Id: likedUserId,
          createdAt: new Date().toISOString()
        };

        // Create match notifications for both users
        const notifications = [
          createNotification(state.currentUser.id, 'match', likedUserId),
          createNotification(likedUserId, 'match', state.currentUser.id)
        ];

        return {
          matches: [...state.matches, newMatch],
          notifications: [...state.notifications, ...notifications]
        };
      }

      // Add like
      return {
        likes: [...(state.likes || []), { 
          userId: state.currentUser.id, 
          likedUserId,
          createdAt: new Date().toISOString()
        }]
      };
    }),

  checkMatch: (userId1, userId2) => {
    const state = get();
    return state.matches.some(
      match => 
        (match.user1Id === userId1 && match.user2Id === userId2) ||
        (match.user1Id === userId2 && match.user2Id === userId1)
    );
  }
});