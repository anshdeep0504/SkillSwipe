import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useStore } from '../store';

interface ReplyFormProps {
  tweetId: string;
  onReply?: () => void;
}

export function ReplyForm({ tweetId, onReply }: ReplyFormProps) {
  const [content, setContent] = useState('');
  const addTweet = useStore((state) => state.addTweet);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      addTweet(content, tweetId);
      setContent('');
      onReply?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tweet your reply"
        className="w-full resize-none border-none bg-transparent text-lg outline-none"
        rows={2}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!content.trim()}
          className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}