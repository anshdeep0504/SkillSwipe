import React from 'react';
import { Newspaper, Bookmark, Share2, ExternalLink } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  source: string;
  date: string;
  category: string;
  image: string;
  url: string;
  summary: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'The Rise of Skill-Based Learning in Tech Industry',
    source: 'TechCrunch',
    date: '2024-03-15',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop',
    url: '#',
    summary: 'How companies are shifting focus from traditional degrees to practical skills...'
  },
  // Add more articles...
];

export function NewsSection() {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="h-5 w-5 text-primary-500" />
        <h2 className="font-bold text-xl text-white">Latest News</h2>
      </div>

      {newsArticles.map((article) => (
        <div key={article.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors">
          <img src={article.image} alt="" className="w-full h-32 object-cover" />
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-primary-400">{article.source}</span>
              <span className="text-xs text-gray-400">{article.date}</span>
            </div>
            <h3 className="font-semibold text-white mb-2">{article.title}</h3>
            <p className="text-sm text-gray-300 mb-4">{article.summary}</p>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-600 rounded-full">
                  <Bookmark className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-600 rounded-full">
                  <Share2 className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <a href={article.url} className="flex items-center gap-1 text-primary-400 hover:text-primary-300">
                <span className="text-sm">Read more</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}