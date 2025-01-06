import { StateCreator } from 'zustand';
import { AppState, User } from '../../types';

export interface UsersSlice {
  users: User[];
  currentUser: User | null;
  createUser: (userData: Omit<User, 'id'>) => User;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const createUsersSlice: StateCreator<AppState, [], [], UsersSlice> = (set) => ({
  users: [],
  currentUser: null,

  createUser: (userData) => {
    const newUser: User = {
      ...userData,
      id: crypto.randomUUID(),
      following: [],
      badges: [],
      theme: 'light',
      interests: [],
      bookmarks: [],
      muted: [],
      blocked: [],
      verified: false,
      analytics: {
        totalTweets: 0,
        totalLikes: 0,
        totalFollowers: 0,
        engagementRate: 0,
        reachByDay: {}
      },
      preferences: {
        theme: 'light',
        language: 'en',
        contentFilter: 'medium',
        autoTranslate: false,
        notifications: {
          likes: true,
          replies: true,
          mentions: true,
          follows: true,
          messages: true
        }
      }
    };

    set((state) => ({
      users: [...state.users, newUser]
    }));

    return newUser;
  },

  login: (user) => 
    set((state) => ({
      currentUser: user,
      users: state.users.some((u) => u.id === user.id)
        ? state.users
        : [...state.users, user],
    })),

  logout: () => set({ currentUser: null }),

  updateProfile: (updates) =>
    set((state) => ({
      currentUser: state.currentUser ? { ...state.currentUser, ...updates } : null,
      users: state.users.map((user) =>
        user.id === state.currentUser?.id ? { ...user, ...updates } : user
      ),
    })),
});