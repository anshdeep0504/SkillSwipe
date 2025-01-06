import React, { useState } from 'react';
import { useStore } from '../../store';
import { SkillCategory, SkillLevel } from '../../types/skill';

const skillCategories: SkillCategory[] = ['technology', 'language', 'arts', 'music', 'business', 'fitness', 'other'];
const skillLevels: SkillLevel[] = ['beginner', 'intermediate', 'advanced', 'expert'];

export function SkillForm() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'technology' as SkillCategory,
    level: 'intermediate' as SkillLevel,
    description: '',
  });

  const { currentUser, addSkill } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    addSkill({
      ...formData,
      userId: currentUser.id,
    });

    setFormData({
      name: '',
      category: 'technology',
      level: 'intermediate',
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Skill Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as SkillCategory })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          {skillCategories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Level</label>
        <select
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: e.target.value as SkillLevel })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          {skillLevels.map((level) => (
            <option key={level} value={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          rows={3}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-2 text-white hover:opacity-90 transition-opacity"
      >
        Add Skill
      </button>
    </form>
  );
}