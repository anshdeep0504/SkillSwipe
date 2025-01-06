import React from 'react';
import { Filter, Hash, AtSign, Calendar } from 'lucide-react';

interface ContentFiltersProps {
  onFilterChange: (filters: string[]) => void;
}

export function ContentFilters({ onFilterChange }: ContentFiltersProps) {
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);

  const filters = [
    { id: 'media', label: 'Media', icon: Filter },
    { id: 'hashtags', label: 'Hashtags', icon: Hash },
    { id: 'mentions', label: 'Mentions', icon: AtSign },
    { id: 'latest', label: 'Latest', icon: Calendar },
  ];

  const toggleFilter = (filterId: string) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(id => id !== filterId)
      : [...selectedFilters, filterId];
    
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex gap-2 p-4 overflow-x-auto">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => toggleFilter(filter.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
            selectedFilters.includes(filter.id)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <filter.icon className="h-4 w-4" />
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
}