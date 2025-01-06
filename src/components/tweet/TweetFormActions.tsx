import React from 'react';
import { Send } from 'lucide-react';

interface TweetFormActionsProps {
  content: string;
  image?: string;
}

export function TweetFormActions({ content, image }: TweetFormActionsProps) {
  return (
    <div className="mt-4 flex items-center justify-end">
      <button
        type="submit"
        disabled={!content.trim() && !image}
        className="rounded-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 px-6 py-2 font-bold text-white disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
      >
        <span className="hidden md:inline">Tweet</span>
        <Send className="h-5 w-5 md:inline-block md:hidden" />
      </button>
    </div>
  );
}