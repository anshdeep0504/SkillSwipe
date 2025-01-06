import { StateCreator } from 'zustand';
import { AppState } from '../../types';

export interface Like {
  id: string;
  userId: string;
  likedUserId: string;
  createdAt: string;
}

export interface LikesSlice {
  likes: Like[];
  addLike: (likedUserId: string) => void;
  removeLike: (likedUserId: string) => void;
  checkMatch: (userId1: string, userId2: string) => boolean;
}

export const createLikesSlice: StateCreator<AppState, [], [], LikesSlice> = (set, get) => ({
  likes: [],

  addLike: (likedUserId) => {
    set((state) => {
      if (!state.currentUser) return state;

      const newLike: Like = {
        id: crypto.randomUUID(),
        userId: state.currentUser.id,
        likedUserId,
        createdAt: new Date().toISOString(),
      };

      // Create a notification for the liked user
      const likedUser = state.users.find(u => u.id === likedUserId);
      const notification = {
        id: crypto.randomUUID(),
        type: 'like' as const,
        userId: likedUserId,
        triggeredBy: state.currentUser.id,
        content: `${state.currentUser.name} liked your profile! Start chatting now.`,
        createdAt: new Date().toISOString(),
        read: false,
      };

      // Create initial message
      const message = {
        id: crypto.randomUUID(),
        senderId: state.currentUser.id,
        receiverId: likedUserId,
        content: `Hi ${likedUser?.name}! I'm interested in your skills. Let's connect!`,
        createdAt: new Date().toISOString(),
        read: false,
      };

      return {
        likes: [...state.likes, newLike],
        notifications: [...state.notifications, notification],
        messages: [...state.messages, message],
      };
    });
  },

  removeLike: (likedUserId) => {
    set((state) => ({
      likes: state.likes.filter(
        (like) => !(like.userId === state.currentUser?.id && like.likedUserId === likedUserId)
      ),
    }));
  },

  checkMatch: (userId1, userId2) => {
    const state = get();
    const user1LikedUser2 = state.likes.some(
      (like) => like.userId === userId1 && like.likedUserId === userId2
    );
    const user2LikedUser1 = state.likes.some(
      (like) => like.userId === userId2 && like.likedUserId === userId1
    );
    return user1LikedUser2 || user2LikedUser1; // Changed to OR instead of AND
  },
});