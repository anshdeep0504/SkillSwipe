import React, { useState, useEffect } from 'react';
import { ConversationList } from './ConversationList';
import { ChatArea } from './ChatArea';
import { EmptyState } from './EmptyState';
import { useStore } from '../../store';

export function Messages() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const clearMessages = useStore(state => state.clearMessages);

  useEffect(() => {
    // Clear messages when component mounts
    clearMessages();
  }, []);

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-[320px,1fr] h-[calc(100vh-4rem)] bg-linkedin-card rounded-lg shadow-card overflow-hidden">
      <ConversationList 
        selectedUserId={selectedUserId}
        onSelectUser={setSelectedUserId}
      />
      
      {selectedUserId ? (
        <ChatArea userId={selectedUserId} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}