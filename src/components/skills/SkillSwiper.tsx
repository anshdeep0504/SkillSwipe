import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Star, Briefcase, MapPin } from 'lucide-react';
import { useStore } from '../../store';
import type { Skill } from '../../types/skill';

const SWIPE_THRESHOLD = 100;

export function SkillSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const { skills, users, currentUser, addLike } = useStore();

  const availableSkills = skills.filter(
    (skill) => skill.userId !== currentUser?.id
  );

  const handleDragStart = (event: any) => {
    setDragStart({
      x: event.clientX ?? event.touches[0].clientX,
      y: event.clientY ?? event.touches[0].clientY,
    });
  };

  const handleDragEnd = (event: any, skill: Skill) => {
    const deltaX = (event.clientX ?? event.changedTouches[0].clientX) - dragStart.x;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX > 0) handleLike(skill);
      else handleDislike();
    }
  };

  const handleLike = (skill: Skill) => {
    addLike(skill.userId);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleDislike = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (currentIndex >= availableSkills.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[90vh] text-center p-4">
        <div className="w-24 h-24 mb-8 rounded-full bg-gradient-to-r from-primary-100 to-accent-100 flex items-center justify-center">
          <Star className="w-12 h-12 text-primary-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4">No more profiles to show!</h2>
        <p className="text-gray-500">Check back later for more potential matches</p>
      </div>
    );
  }

  const currentSkill = availableSkills[currentIndex];
  const skillUser = users.find(u => u.id === currentSkill.userId);

  if (!skillUser) return null;

  return (
    <div className="relative h-[90vh] w-full max-w-md mx-auto">
      <AnimatePresence>
        <motion.div
          key={currentSkill.id}
          className="absolute inset-0"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={handleDragStart}
          onDragEnd={(e) => handleDragEnd(e, currentSkill)}
          whileDrag={{ scale: 1.05 }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative h-full rounded-3xl shadow-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
            {/* Profile Image */}
            <div className="relative h-2/3">
              <img 
                src={skillUser.avatar} 
                alt={skillUser.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
            </div>

            {/* User Details */}
            <div className="absolute bottom-28 left-0 right-0 px-6">
              <div className="space-y-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-bold">{skillUser.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-white/80">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-sm">{skillUser.bio?.split('|')[1]?.trim()}</span>
                    </div>
                  </div>
                  {skillUser.verified && (
                    <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                      <Star className="w-6 h-6" fill="currentColor" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-5 h-5" />
                  <span>{skillUser.location}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                      {currentSkill.name}
                    </span>
                    <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                      {currentSkill.level}
                    </span>
                  </div>
                  <p className="text-white/80 line-clamp-2">
                    {currentSkill.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
              <button
                onClick={() => handleDislike()}
                className="w-16 h-16 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all transform hover:scale-110"
              >
                <X className="w-8 h-8" />
              </button>
              <button
                onClick={() => handleLike(currentSkill)}
                className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg hover:opacity-90 transition-all transform hover:scale-110"
              >
                <Heart className="w-8 h-8" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}