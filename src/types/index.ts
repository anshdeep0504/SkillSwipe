import { SkillsSlice } from '../store/slices/skills';
import { UsersSlice } from '../store/slices/users';
import { LikesSlice } from '../store/slices/likes';
import { Message } from './message';
import { Notification } from './notification';
import { Like } from '../store/slices/likes';

export interface AppState extends SkillsSlice, UsersSlice, LikesSlice {
  messages: Message[];
  notifications: Notification[];
  likes: Like[];
}

// ... rest of your existing interfaces ...