import React, { useState } from 'react';
import { Send, Smile, Image as ImageIcon, Paperclip } from 'lucide-react';
import { useStore } from '../../store';
import { EmojiPicker } from '../EmojiPicker';

interface ChatInputProps {
  receiverId: string;
}

export function ChatInput({ receiverId }: ChatInputProps) {
  const [messageContent, setMessageContent] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { sendMessage } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageContent.trim()) {
      sendMessage(receiverId, messageContent.trim());
      setMessageContent('');
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessageContent(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="p-4 border-t border-gray-100 bg-white">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex-1 relative">
          <div className="absolute bottom-full mb-2 left-0">
            {showEmojiPicker && (
              <EmojiPicker
                onSelect={handleEmojiSelect}
                onClose={() => setShowEmojiPicker(false)}
              />
            )}
          </div>
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <Smile className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </button>
          </div>
          <textarea
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Type a message..."
            className="w-full rounded-2xl bg-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            rows={1}
          />
        </div>
        <button
          type="submit"
          disabled={!messageContent.trim()}
          className="p-3 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white disabled:opacity-50 hover:opacity-90 transition-opacity"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}