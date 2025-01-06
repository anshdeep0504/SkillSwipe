import React from 'react';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  onLogout: () => void;
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <button
      onClick={onLogout}
      className="group relative w-full flex items-center justify-center p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
    >
      <LogOut className="h-5 w-5" />
      <span className="absolute left-full ml-2 px-2 py-1 bg-white text-gray-900 text-sm rounded shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
        Logout
      </span>
    </button>
  );
}