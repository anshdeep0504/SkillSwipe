import React, { useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { useStore } from '../../store';
import { TweetFormActions } from './TweetFormActions';
import { TweetFormInput } from './TweetFormInput';
import { TweetFormMedia } from './TweetFormMedia';

export function TweetForm() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string>();
  const [location, setLocation] = useState<string>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const addTweet = useStore((state) => state.addTweet);
  const currentUser = useStore((state) => state.currentUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() || image) {
      const tweetContent = location ? `${content}\n📍 ${location}` : content;
      addTweet(tweetContent, image);
      setContent('');
      setImage(undefined);
      setLocation(undefined);
    }
  };

  if (!currentUser) return null;

  return (
    <form onSubmit={handleSubmit} className="border-b border-gray-200 p-4 bg-gradient-to-br from-primary-50/50 to-accent-50/50">
      <div className="flex gap-4">
        <img
          src={currentUser.avatar}
          alt=""
          className="h-12 w-12 rounded-full"
        />
        <div className="flex-1">
          <TweetFormInput
            ref={textareaRef}
            content={content}
            onChange={setContent}
          />
          
          <TweetFormMedia
            location={location}
            onLocationChange={setLocation}
            image={image}
            onImageChange={setImage}
          />

          <TweetFormActions
            content={content}
            image={image}
          />
        </div>
      </div>
    </form>
  );
}