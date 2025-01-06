import { StateCreator } from 'zustand';
import { AppState } from '../../types';
import { Message } from '../../types/message';

export interface MessagesSlice {
  messages: Message[];
  sendMessage: (receiverId: string, content: string) => void;
  markMessageAsRead: (messageId: string) => void;
  deleteMessage: (messageId: string) => void;
  clearMessages: () => void; // Added new action
}

export const createMessagesSlice: StateCreator<AppState, [], [], MessagesSlice> = (set) => ({
  messages: [],

  sendMessage: (receiverId, content) =>
    set((state) => {
      if (!state.currentUser) return state;

      const newMessage: Message = {
        id: crypto.randomUUID(),
        senderId: state.currentUser.id,
        receiverId,
        content,
        createdAt: new Date().toISOString(),
        read: false,
      };

      const notification = {
        id: crypto.randomUUID(),
        type: 'message' as const,
        userId: receiverId,
        triggeredBy: state.currentUser.id,
        content: `New message from ${state.currentUser.name}`,
        createdAt: new Date().toISOString(),
        read: false,
      };

      return {
        messages: [...state.messages, newMessage],
        notifications: [...state.notifications, notification],
      };
    }),

  markMessageAsRead: (messageId) =>
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === messageId ? { ...message, read: true } : message
      ),
    })),

  deleteMessage: (messageId) =>
    set((state) => ({
      messages: state.messages.filter((message) => message.id !== messageId),
    })),

  clearMessages: () => set({ messages: [] }), // Added new action implementation
});