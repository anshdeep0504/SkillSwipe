import React, { useRef } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (base64: string) => void;
  onImageClear: () => void;
  selectedImage?: string;
}

export function ImageUpload({ onImageSelect, onImageClear, selectedImage }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onImageSelect(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageSelect}
        accept="image/*"
        className="hidden"
      />
      
      {selectedImage ? (
        <div className="relative mt-2">
          <img
            src={selectedImage}
            alt="Selected"
            className="rounded-lg max-h-80 w-full object-cover"
          />
          <button
            onClick={onImageClear}
            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-full p-2 text-blue-500 hover:bg-blue-50"
        >
          <ImageIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}