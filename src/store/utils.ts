import { Notification } from '../types';

export const createNotification = (
  userId: string,
  type: Notification['type'],
  triggeredBy: string,
  tweetId?: string,
  messageId?: string
): Notification => ({
  id: crypto.randomUUID(),
  userId,
  type,
  triggeredBy,
  tweetId,
  messageId,
  createdAt: new Date().toISOString(),
  read: false,
});