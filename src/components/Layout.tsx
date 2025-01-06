import React, { useState } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import { useStore } from '../store';
import { NavContent } from './navigation/NavContent';
import { MobileNav } from './navigation/MobileNav';
import { SearchBar } from './search/SearchBar';
import { SuccessStories } from './features/SuccessStories';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Layout({ children, onNavigate, currentPage }: LayoutProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { currentUser } = useStore();

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-linkedin-background text-linkedin-text">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-linkedin-card shadow-card z-50">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => setIsMobileNavOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-linkedin-button" />
            <span className="font-bold text-lg">SkillSwap</span>
          </div>
          <div className="w-6" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl flex pt-[60px] md:pt-0">
        {/* Desktop Sidebar */}
        <nav className="hidden md:flex flex-col sticky top-0 h-screen w-[280px] border-r border-linkedin-border bg-linkedin-card">
          <NavContent currentPage={currentPage} onNavigate={onNavigate} />
        </nav>

        {/* Mobile Navigation */}
        <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)}>
          <NavContent currentPage={currentPage} onNavigate={onNavigate} />
        </MobileNav>

        {/* Main Content */}
        <main className="flex-1 min-h-screen bg-linkedin-background">
          {children}
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-[350px] p-4 sticky top-0 h-screen overflow-y-auto bg-linkedin-card border-l border-linkedin-border">
          <SearchBar />
          <SuccessStories />
        </aside>
      </div>
    </div>
  );
}