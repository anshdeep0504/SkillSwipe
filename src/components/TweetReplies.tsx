import React from 'react';
import { Tweet } from './Tweet';
import { useStore } from '../store';

interface TweetRepliesProps {
  tweetId: string;
}

export function TweetReplies({ tweetId }: TweetRepliesProps) {
  const tweets = useStore((state) => 
    state.tweets.filter(tweet => tweet.replyToId === tweetId)
  );

  if (tweets.length === 0) return null;

  return (
    <div className="ml-12 border-l border-gray-200 pl-4">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} isReply />
      ))}
    </div>
  );
}