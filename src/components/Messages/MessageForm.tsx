import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useStore } from '../../store';

interface MessageFormProps {
  receiverId: string;
  onMessageSent?: () => void;
}

export function MessageForm({ receiverId, onMessageSent }: MessageFormProps) {
  const [content, setContent] = useState('');
  const sendMessage = useStore((state) => state.sendMessage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      sendMessage(receiverId, content.trim());
      setContent('');
      onMessageSent?.();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
        className="w-full resize-none rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
        rows={3}
      />
      <button
        type="submit"
        disabled={!content.trim()}
        className="mt-2 w-full flex items-center justify-center gap-2 rounded-full bg-primary-500 text-white px-6 py-2 disabled:opacity-50 hover:bg-primary-600 transition-colors"
      >
        <Send className="w-4 h-4" />
        <span>Send Message</span>
      </button>
    </form>
  );
}