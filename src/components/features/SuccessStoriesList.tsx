import React, { useState } from 'react';
import { successStories } from '../../data/successStories';
import { SuccessStoryCard } from './SuccessStoryCard';
import { SuccessStoryModal } from './SuccessStoryModal';
import { ChevronDown } from 'lucide-react';

export function SuccessStoriesList() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [visibleStories, setVisibleStories] = useState(5);

  const loadMore = () => {
    setVisibleStories(prev => Math.min(prev + 5, successStories.length));
  };

  return (
    <div className="space-y-4">
      {successStories.slice(0, visibleStories).map((story) => (
        <SuccessStoryCard
          key={story.id}
          story={story}
          onClick={() => setSelectedStory(story)}
        />
      ))}

      {visibleStories < successStories.length && (
        <button
          onClick={loadMore}
          className="w-full py-3 flex items-center justify-center gap-2 text-primary-400 hover:text-primary-300"
        >
          <span>Load more stories</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      )}

      {selectedStory && (
        <SuccessStoryModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </div>
  );
}