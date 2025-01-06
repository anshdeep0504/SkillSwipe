import React from 'react';
import { X } from 'lucide-react';

const EMOJI_CATEGORIES = {
  'Frequently Used': ['👍', '❤️', '😊', '🎉', '🔥', '😂', '🥰', '✨'],
  'Smileys': ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😍'],
  'Gestures': ['👋', '✌️', '🤞', '👍', '👎', '👊', '🤝', '🙏'],
  'Nature': ['🌺', '🌸', '🌼', '🌻', '🌞', '⭐', '🌙', '☁️'],
};

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

export function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  return (
    <div className="absolute bottom-full mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-72">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-gray-700">Emojis</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="max-h-64 overflow-y-auto">
        {Object.entries(EMOJI_CATEGORIES).map(([category, emojis]) => (
          <div key={category} className="mb-4">
            <h4 className="text-sm text-gray-500 mb-2">{category}</h4>
            <div className="grid grid-cols-8 gap-1">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    onSelect(emoji);
                    onClose();
                  }}
                  className="p-1 hover:bg-gray-100 rounded text-xl"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}