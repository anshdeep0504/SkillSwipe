export interface Notification {
  id: string;
  type: 'match' | 'message' | 'like' | 'follow';
  userId: string;
  triggeredBy: string;
  content?: string;
  createdAt: string;
  read: boolean;
}