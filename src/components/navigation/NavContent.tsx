import React from 'react';
import { Zap, Home, Mail, User, Sparkles, Users, Calendar, BookOpen } from 'lucide-react';
import { useStore } from '../../store';
import { NavButton } from './NavButton';
import { UserInfo } from './UserInfo';
import { LogoutButton } from './LogoutButton';

interface NavContentProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function NavContent({ currentPage, onNavigate }: NavContentProps) {
  const { currentUser, messages, logout } = useStore();

  if (!currentUser) return null;

  const navItems = [
    { icon: Home, label: "Home", page: "home" },
    { icon: Users, label: "Find Skills", page: "match" },
    { icon: Calendar, label: "Events", page: "events" },
    { icon: BookOpen, label: "Learn", page: "learn" },
    { icon: Mail, label: "Messages", page: "messages", count: messages.length },
    { icon: User, label: "Profile", page: "profile" }
  ];

  return (
    <div className="flex flex-col h-full bg-white w-16 border-r border-gray-100">
      {/* Logo */}
      <div className="p-3">
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-lg">
          <Zap className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <NavButton
            key={item.page}
            icon={item.icon}
            label={item.label}
            page={item.page}
            currentPage={currentPage}
            onNavigate={onNavigate}
            count={item.count}
          />
        ))}

        <button
          onClick={() => onNavigate('add-skill')}
          className="w-full flex items-center justify-center p-2.5 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:opacity-90 transition-opacity"
        >
          <Sparkles className="h-5 w-5" />
        </button>
      </nav>

      {/* User Section */}
      <div className="p-2 border-t border-gray-100">
        <UserInfo user={currentUser} />
        <LogoutButton onLogout={logout} />
      </div>
    </div>
  );
}