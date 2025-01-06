import React, { useState, useRef } from 'react';
import { Send, Smile, MapPin } from 'lucide-react';
import { useStore } from '../store';
import { ImageUpload } from './ImageUpload';
import { EmojiPicker } from './EmojiPicker';
import { LocationPicker } from './LocationPicker';

export function TweetForm() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const addTweet = useStore((state) => state.addTweet);
  const currentUser = useStore((state) => state.currentUser);

  const handleEmojiSelect = (emoji: string) => {
    const start = content.slice(0, cursorPosition);
    const end = content.slice(cursorPosition);
    const newContent = start + emoji + end;
    setContent(newContent);
    setCursorPosition(cursorPosition + emoji.length);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setCursorPosition(e.target.selectionStart);
  };

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
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleTextareaChange}
            onSelect={(e) => setCursorPosition(e.currentTarget.selectionStart)}
            placeholder="What's happening?"
            className="w-full resize-none border-none bg-transparent text-xl outline-none placeholder:text-gray-500"
            rows={3}
          />
          
          {location && (
            <div className="flex items-center gap-2 text-primary-500 mb-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{location}</span>
              <button
                type="button"
                onClick={() => setLocation(undefined)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          
          <ImageUpload
            onImageSelect={setImage}
            onImageClear={() => setImage(undefined)}
            selectedImage={image}
          />

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2 relative">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="rounded-full p-2 text-primary-500 hover:bg-primary-50"
              >
                <Smile className="h-5 w-5" />
              </button>
              {showEmojiPicker && (
                <EmojiPicker
                  onSelect={handleEmojiSelect}
                  onClose={() => setShowEmojiPicker(false)}
                />
              )}
              
              <button
                type="button"
                onClick={() => setShowLocationPicker(!showLocationPicker)}
                className="rounded-full p-2 text-primary-500 hover:bg-primary-50"
              >
                <MapPin className="h-5 w-5" />
              </button>
              {showLocationPicker && (
                <LocationPicker
                  onSelect={setLocation}
                  onClose={() => setShowLocationPicker(false)}
                />
              )}
            </div>
            
            <button
              type="submit"
              disabled={!content.trim() && !image}
              className="rounded-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 px-6 py-2 font-bold text-white disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
            >
              <span className="hidden md:inline">Tweet</span>
              <Send className="h-5 w-5 md:inline-block md:hidden" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}