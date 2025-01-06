import React from 'react';
import { TrendingUp, Hash } from 'lucide-react';
import { useStore } from '../../store';

export function TrendingTopics() {
  const trends = [
    { tag: 'Technology', tweets: 125000 },
    { tag: 'Programming', tweets: 89000 },
    { tag: 'WebDev', tweets: 45000 },
    { tag: 'AI', tweets: 78000 },
    { tag: 'React', tweets: 34000 },
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-blue-500" />
        <h2 className="font-bold text-xl">Trending</h2>
      </div>
      
      <div className="space-y-4">
        {trends.map((trend) => (
          <div
            key={trend.tag}
            className="hover:bg-gray-100 p-3 rounded-lg transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 text-gray-600">
              <Hash className="h-4 w-4" />
              <span>{trend.tag}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {(trend.tweets / 1000).toFixed(1)}K tweets
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}