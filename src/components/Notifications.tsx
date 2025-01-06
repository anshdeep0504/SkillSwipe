import React from 'react';
import { useStore } from '../store';
import { Bell, MessageCircle, Heart, User } from 'lucide-react';
import { useNavigate } from '../hooks/useNavigate';

export function Notifications() {
  const { notifications, users, currentUser, markNotificationAsRead } = useStore();
  const navigate = useNavigate();

  // Get user's notifications
  const userNotifications = notifications
    .filter(n => n.userId === currentUser?.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'message':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follow':
        return <User className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleNotificationClick = (notification) => {
    markNotificationAsRead(notification.id);
    if (notification.type === 'message' || notification.type === 'like') {
      navigate('messages');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Notifications</h2>
        </div>

        <div className="divide-y">
          {userNotifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No notifications yet. Start swiping to find matches!
            </div>
          ) : (
            userNotifications.map((notification) => {
              const triggeredByUser = users.find(u => u.id === notification.triggeredBy);
              return (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={triggeredByUser?.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <p className="text-gray-900">{notification.content}</p>
                      <span className="text-sm text-gray-500">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}