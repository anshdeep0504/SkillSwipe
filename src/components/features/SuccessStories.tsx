import React, { useState } from 'react';
import { Star, Users, Rocket, Award, X } from 'lucide-react';
import { successStories } from '../../data/successStories';
import type { SuccessStory } from '../../types/successStory';

export function SuccessStories() {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  return (
    <>
      <div className="bg-white rounded-xl border p-4">
        <div className="flex items-center gap-2 mb-4">
          <Rocket className="h-5 w-5 text-primary-500" />
          <h2 className="font-bold text-xl text-gray-900">Success Stories</h2>
        </div>
        
        <div className="space-y-4">
          {successStories.map((story) => (
            <button
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="w-full text-left bg-white border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={story.logo}
                  alt={story.company}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{story.company}</h3>
                  <div className="flex items-center gap-1 text-sm text-primary-600">
                    <Award className="w-4 h-4" />
                    <span>{story.impact}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-3 text-sm">
                {story.story}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {story.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal for full story */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedStory.logo}
                    alt={selectedStory.company}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedStory.company}</h2>
                    <div className="flex items-center gap-1 text-primary-600">
                      <Award className="w-4 h-4" />
                      <span>{selectedStory.impact}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-600">{selectedStory.fullStory}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 my-6">
                {selectedStory.metrics.map((metric) => (
                  <div key={metric.label} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">{metric.value}</div>
                    <div className="text-sm text-gray-500">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={selectedStory.testimonial.avatar}
                    alt={selectedStory.testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{selectedStory.testimonial.name}</div>
                    <div className="text-sm text-gray-500">{selectedStory.testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{selectedStory.testimonial.quote}"</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}