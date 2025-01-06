import React, { forwardRef } from 'react';

interface TweetFormInputProps {
  content: string;
  onChange: (value: string) => void;
}

export const TweetFormInput = forwardRef<HTMLTextAreaElement, TweetFormInputProps>(
  ({ content, onChange }, ref) => {
    return (
      <textarea
        ref={ref}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What's happening?"
        className="w-full resize-none border-none bg-transparent text-xl outline-none placeholder:text-gray-500"
        rows={3}
      />
    );
  }
);