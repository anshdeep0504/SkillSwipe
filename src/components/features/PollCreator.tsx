import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface PollCreatorProps {
  onCreatePoll: (options: string[], duration: number) => void;
  onCancel: () => void;
}

export function PollCreator({ onCreatePoll, onCancel }: PollCreatorProps) {
  const [options, setOptions] = useState(['', '']);
  const [duration, setDuration] = useState(24); // hours

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (options.every(opt => opt.trim())) {
      onCreatePoll(options, duration);
    }
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                maxLength={25}
              />
              {index >= 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                >
                  <Minus className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {options.length < 4 && (
          <button
            type="button"
            onClick={addOption}
            className="flex items-center gap-2 text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-full"
          >
            <Plus className="h-5 w-5" />
            Add option
          </button>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Poll duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value={1}>1 hour</option>
            <option value={24}>24 hours</option>
            <option value={72}>3 days</option>
            <option value={168}>7 days</option>
          </select>
        </div>

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
            Create Poll
          </button>
        </div>
      </form>
    </div>
  );
}