import React from 'react';
import { X, MapPin } from 'lucide-react';
import { ImageUpload } from '../ImageUpload';

interface TweetFormMediaProps {
  location?: string;
  onLocationChange: (location?: string) => void;
  image?: string;
  onImageChange: (image?: string) => void;
}

export function TweetFormMedia({ location, onLocationChange, image, onImageChange }: TweetFormMediaProps) {
  return (
    <>
      {location && (
        <div className="flex items-center gap-2 text-primary-500 mb-2">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{location}</span>
          <button
            type="button"
            onClick={() => onLocationChange(undefined)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      
      <ImageUpload
        onImageSelect={onImageChange}
        onImageClear={() => onImageChange(undefined)}
        selectedImage={image}
      />
    </>
  );
}