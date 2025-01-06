import React from 'react';
import { Zap, Shield, Globe, Sparkles } from 'lucide-react';

export function USP() {
  const features = [
    {
      icon: Zap,
      title: "Real-time Engagement",
      description: "Experience lightning-fast interactions with instant updates and notifications"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Advanced privacy controls and content moderation to keep your experience safe"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with like-minded individuals from around the world"
    },
    {
      icon: Sparkles,
      title: "Creative Freedom",
      description: "Express yourself with rich media, polls, and threaded conversations"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Why Choose Wave?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <feature.icon className="h-8 w-8 text-blue-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}