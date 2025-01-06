import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { ImageUpload } from '../ImageUpload';

interface ThreadCreatorProps {
  onCreateThread: (tweets: { content: string; image?: string }[]) => void;
  onCancel: () => void;
}

export function ThreadCreator({ onCreateThread, onCancel }: ThreadCreatorProps) {
  const [tweets, setTweets] = useState([{ content: '', image: undefined }]);

  const addTweet = () => {
    setTweets([...tweets, { content: '', image: undefined }]);
  };

  const removeTweet = (index: number) => {
    if (tweets.length > 1) {
      setTweets(tweets.filter((_, i) => i !== index));
    }
  };

  const updateTweet = (index: number, content: string) => {
    const newTweets = [...tweets];
    newTweets[index] = { ...newTweets[index], content };
    setTweets(newTweets);
  };

  const updateImage = (index: number, image?: string) => {
    const newTweets = [...tweets];
    newTweets[index] = { ...newTweets[index], image };
    setTweets(newTweets);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tweets.some(tweet => tweet.content.trim())) {
      onCreateThread(tweets);
    }
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <h3 className="font-bold text-xl mb-4">Create Thread</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {tweets.map((tweet, index) => (
          <div key={index} className="relative border border-gray-200 rounded-xl p-4">
            <div className="absolute -left-2 -top-2 flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full">
              {index + 1}
            </div>
            
            <textarea
              value={tweet.content}
              onChange={(e) => updateTweet(index, e.target.value)}
              placeholder="What's happening?"
              className="w-full resize-none border-none bg-transparent text-lg outline-none"
              rows={3}
            />
            
            <ImageUpload
              onImageSelect={(image) => updateImage(index, image)}
              onImageClear={() => updateImage(index, undefined)}
              selectedImage={tweet.image}
            />
            
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeTweet(index)}
                className="absolute -right-2 -top-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <Minus className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addTweet}
          className="flex items-center gap-2 text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-full"
        >
          <Plus className="h-5 w-5" />
          Add tweet to thread
        </button>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            Post Thread
          </button>
        </div>
      </form>
    </div>
  );
}