import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';

const POPULAR_LOCATIONS = [
  'New York, NY',
  'Los Angeles, CA',
  'London, UK',
  'Tokyo, Japan',
  'Paris, France',
  'Sydney, Australia',
];

interface LocationPickerProps {
  onSelect: (location: string) => void;
  onClose: () => void;
}

export function LocationPicker({ onSelect, onClose }: LocationPickerProps) {
  const [customLocation, setCustomLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customLocation.trim()) {
      onSelect(customLocation);
      onClose();
    }
  };

  return (
    <div className="absolute bottom-full mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-72">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-700">Add location</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={customLocation}
            onChange={(e) => setCustomLocation(e.target.value)}
            placeholder="Enter location"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={() => {
              if (customLocation.trim()) {
                onSelect(customLocation);
                onClose();
              }
            }}
            disabled={!customLocation.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-full disabled:opacity-50 hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <h4 className="text-sm text-gray-500 mb-2">Popular locations</h4>
        <div className="space-y-2">
          {POPULAR_LOCATIONS.map((location) => (
            <button
              key={location}
              onClick={() => {
                onSelect(location);
                onClose();
              }}
              className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50 rounded-lg text-left"
            >
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{location}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}