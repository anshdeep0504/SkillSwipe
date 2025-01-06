import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { useStore } from '../../store';
import { ConversationItem } from './ConversationItem';

interface ConversationListProps {
  selectedUserId: string | null;
  onSelectUser: (userId: string) => void;
}

export function ConversationList({ selectedUserId, onSelectUser }: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { messages, users, currentUser } = useStore();

  const conversations = React.useMemo(() => {
    if (!currentUser) return [];

    const userMessages = messages.filter(
      msg => msg.senderId === currentUser.id || msg.receiverId === currentUser.id
    );
    
    const uniqueUsers = new Set(
      userMessages.map(msg => 
        msg.senderId === currentUser.id ? msg.receiverId : msg.senderId
      )
    );
    
    return Array.from(uniqueUsers)
      .map(userId => {
        const user = users.find(u => u.id === userId);
        const lastMessage = userMessages
          .filter(msg => 
            (msg.senderId === userId && msg.receiverId === currentUser.id) ||
            (msg.receiverId === userId && msg.senderId === currentUser.id)
          )
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
          
        return { user, lastMessage };
      })
      .filter(({ user }) => 
        user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [messages, users, currentUser, searchQuery]);

  return (
    <div className="border-r border-gray-100 bg-white">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Messages</h2>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <button className="w-full flex items-center justify-center gap-2 p-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:opacity-90 transition-opacity">
          <Plus className="w-5 h-5" />
          <span>New Message</span>
        </button>
      </div>

      <div className="overflow-y-auto h-[calc(100%-8rem)]">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No messages yet. Start connecting!
          </div>
        ) : (
          conversations.map(({ user, lastMessage }) => (
            user && (
              <ConversationItem
                key={user.id}
                user={user}
                lastMessage={lastMessage}
                isSelected={selectedUserId === user.id}
                onClick={() => onSelectUser(user.id)}
              />
            )
          ))
        )}
      </div>
    </div>
  );
}