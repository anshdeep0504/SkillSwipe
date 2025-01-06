import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store';
import { MessageCircle, Send, Image as ImageIcon, Smile, Trash2, Search, Filter } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { EmojiPicker } from './EmojiPicker';

export function Messages() {
  const { messages, users, currentUser, sendMessage, deleteMessage } = useStore();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get unique conversations
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

  const selectedUser = users.find(u => u.id === selectedUserId);
  const conversationMessages = messages
    .filter(msg => 
      (msg.senderId === currentUser?.id && msg.receiverId === selectedUserId) ||
      (msg.senderId === selectedUserId && msg.receiverId === currentUser?.id)
    )
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageContent.trim() && selectedUserId) {
      sendMessage(selectedUserId, messageContent.trim());
      setMessageContent('');
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessageContent(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleDeleteMessage = (messageId: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      deleteMessage(messageId);
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-[320px,1fr] h-[calc(100vh-4rem)] bg-linkedin-card rounded-lg shadow-card overflow-hidden">
      {/* Conversations List */}
      <div className="border-r border-linkedin-border">
        <div className="p-4 border-b border-linkedin-border">
          <h2 className="text-xl font-bold mb-4">Messaging</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-linkedin-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-linkedin-input text-linkedin-text placeholder:text-linkedin-muted"
            />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-5rem)]">
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-linkedin-muted">
              No messages yet. Start connecting!
            </div>
          ) : (
            conversations.map(({ user, lastMessage }) => (
              <button
                key={user?.id}
                onClick={() => setSelectedUserId(user?.id || null)}
                className={`w-full p-4 text-left hover:bg-linkedin-hover transition-colors ${
                  selectedUserId === user?.id ? 'bg-linkedin-hover' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user?.avatar}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-linkedin-text">{user?.name}</div>
                    {lastMessage && (
                      <p className="text-sm text-linkedin-muted truncate">
                        {lastMessage.content}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      {selectedUser ? (
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-linkedin-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedUser.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-semibold text-linkedin-text">{selectedUser.name}</div>
                  <div className="text-sm text-linkedin-muted">{selectedUser.bio?.split('|')[0]}</div>
                </div>
              </div>
              <button className="p-2 hover:bg-linkedin-hover rounded-full">
                <Filter className="w-5 h-5 text-linkedin-muted" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversationMessages.map((msg) => {
              const isCurrentUser = msg.senderId === currentUser?.id;
              return (
                <div
                  key={msg.id}
                  className={`group flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="relative max-w-[70%]">
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        isCurrentUser
                          ? 'bg-linkedin-button text-white'
                          : 'bg-linkedin-input text-linkedin-text'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        isCurrentUser ? 'text-white/70' : 'text-linkedin-muted'
                      }`}>
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    {isCurrentUser && (
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="absolute -right-8 top-0 p-1 opacity-0 group-hover:opacity-100 hover:bg-linkedin-hover rounded-full transition-opacity"
                      >
                        <Trash2 className="w-4 h-4 text-linkedin-muted" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-linkedin-border">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 hover:bg-linkedin-hover rounded-full"
                >
                  <Smile className="w-5 h-5 text-linkedin-muted" />
                </button>
                {showEmojiPicker && (
                  <div className="absolute bottom-full mb-2">
                    <EmojiPicker
                      onSelect={handleEmojiSelect}
                      onClose={() => setShowEmojiPicker(false)}
                    />
                  </div>
                )}
              </div>
              <input
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Write a message..."
                className="flex-1 rounded-full bg-linkedin-input text-linkedin-text placeholder:text-linkedin-muted px-4 py-2"
              />
              <button
                type="submit"
                disabled={!messageContent.trim()}
                className="rounded-full bg-linkedin-button text-white p-2 hover:bg-linkedin-buttonHover disabled:opacity-50 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-linkedin-muted">
          <div className="text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-linkedin-button" />
            <p>Select a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
}