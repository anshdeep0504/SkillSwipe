import React from 'react';
import { MessageCircle } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex items-center justify-center h-full text-linkedin-muted">
      <div className="text-center">
        <MessageCircle className="w-12 h-12 mx-auto mb-4 text-linkedin-button" />
        <p>Select a conversation to start messaging</p>
      </div>
    </div>
  );
}