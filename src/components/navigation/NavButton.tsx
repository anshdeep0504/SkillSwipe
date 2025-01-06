import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavButtonProps {
  icon: LucideIcon;
  label: string;
  page: string;
  currentPage: string;
  onNavigate: (page: string) => void;
  count?: number;
}

export function NavButton({ icon: Icon, label, page, currentPage, onNavigate, count }: NavButtonProps) {
  const isActive = currentPage === page;
  
  return (
    <button
      onClick={() => onNavigate(page)}
      className={`group relative w-full flex items-center justify-center p-2.5 rounded-lg transition-all ${
        isActive 
          ? 'bg-primary-50 text-primary-500'
          : 'text-gray-500 hover:bg-gray-50'
      }`}
    >
      <div className="relative">
        <Icon className="h-5 w-5" />
        {count && count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-xs text-white">
            {count}
          </span>
        )}
      </div>
      <span className="absolute left-full ml-2 px-2 py-1 bg-white text-gray-900 text-sm rounded shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
        {label}
      </span>
    </button>
  );
}