import React from 'react';
import { BarChart, TrendingUp, Users, MessageCircle } from 'lucide-react';
import { useStore } from '../../store';

export function AnalyticsDashboard() {
  const { currentUser, tweets } = useStore();
  
  if (!currentUser) return null;

  const userTweets = tweets.filter(tweet => tweet.authorId === currentUser.id);
  const totalLikes = userTweets.reduce((sum, tweet) => sum + tweet.likes.length, 0);
  const totalReplies = userTweets.reduce((sum, tweet) => sum + tweet.replies.length, 0);

  const stats = [
    {
      label: 'Total Tweets',
      value: userTweets.length,
      icon: MessageCircle,
      color: 'text-blue-500',
    },
    {
      label: 'Total Likes',
      value: totalLikes,
      icon: TrendingUp,
      color: 'text-red-500',
    },
    {
      label: 'Total Replies',
      value: totalReplies,
      icon: Users,
      color: 'text-green-500',
    },
    {
      label: 'Engagement Rate',
      value: `${((totalLikes + totalReplies) / (userTweets.length || 1)).toFixed(1)}%`,
      icon: BarChart,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Analytics Overview</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div className={`${stat.color} mb-2`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-4">Recent Performance</h3>
        {/* Add charts/graphs here */}
      </div>
    </div>
  );
}