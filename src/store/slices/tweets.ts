import { StateCreator } from 'zustand';
import { AppState, Tweet, Notification } from '../../types';
import { createNotification } from '../utils';

export interface TweetsSlice {
  tweets: Tweet[];
  addTweet: (content: string, image?: string, replyToId?: string) => void;
  deleteTweet: (tweetId: string) => void;
  toggleLike: (tweetId: string) => void;
  reportTweet: (tweetId: string) => void;
}

export const createTweetsSlice: StateCreator<AppState, [], [], TweetsSlice> = (set) => ({
  tweets: [],
  
  addTweet: (content, image, replyToId) =>
    set((state) => {
      if (!state.currentUser) return state;

      const newTweet: Tweet = {
        id: crypto.randomUUID(),
        content,
        image,
        authorId: state.currentUser.id,
        likes: [],
        replies: [],
        createdAt: new Date().toISOString(),
        replyToId,
        hashtags: [],
        mentions: [],
        bookmarkedBy: [],
        analytics: {
          views: 0,
          reaches: 0,
          engagementRate: 0,
          impressions: 0
        }
      };

      let notifications: Notification[] = [];
      if (replyToId) {
        const parentTweet = state.tweets.find((t) => t.id === replyToId);
        if (parentTweet && parentTweet.authorId !== state.currentUser.id) {
          notifications.push(
            createNotification(
              parentTweet.authorId,
              'reply',
              state.currentUser.id,
              newTweet.id
            )
          );
        }
      }

      const updatedTweets = replyToId
        ? state.tweets.map((tweet) =>
            tweet.id === replyToId
              ? { ...tweet, replies: [...tweet.replies, newTweet.id] }
              : tweet
          )
        : state.tweets;

      return {
        tweets: [newTweet, ...updatedTweets],
        notifications: [...state.notifications, ...notifications],
      };
    }),

  deleteTweet: (tweetId) =>
    set((state) => ({
      tweets: state.tweets.filter((tweet) => tweet.id !== tweetId),
    })),

  toggleLike: (tweetId) =>
    set((state) => {
      if (!state.currentUser) return state;

      const tweet = state.tweets.find((t) => t.id === tweetId);
      const isLiked = tweet?.likes.includes(state.currentUser.id);

      let notifications: Notification[] = [];
      if (!isLiked && tweet && tweet.authorId !== state.currentUser.id) {
        notifications.push(
          createNotification(
            tweet.authorId,
            'like',
            state.currentUser.id,
            tweetId
          )
        );
      }

      return {
        tweets: state.tweets.map((tweet) =>
          tweet.id === tweetId
            ? {
                ...tweet,
                likes: isLiked
                  ? tweet.likes.filter((id) => id !== state.currentUser?.id)
                  : [...tweet.likes, state.currentUser.id],
              }
            : tweet
        ),
        notifications: [...state.notifications, ...notifications],
      };
    }),

  reportTweet: (tweetId) =>
    set((state) => {
      if (!state.currentUser) return state;
      
      const reportedTweets = new Set(state.currentUser.reportedTweets || []);
      reportedTweets.add(tweetId);
      
      return {
        currentUser: {
          ...state.currentUser,
          reportedTweets: Array.from(reportedTweets),
        },
      };
    }),
});