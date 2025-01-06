import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useStore } from '../store';

interface MessageFormProps {
  receiverId: string;
}

export function MessageForm({ receiverId }: MessageFormProps) {
  const [content, setContent] = useState('');
  const sendMessage = useStore((state) => state.sendMessage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      sendMessage(receiverId, content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-full border border-gray-300 px-4 py-2"
        />
        <button
          type="submit"
          disabled={!content.trim()}
          className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}