import React from 'react';
import { Sparkles, Rocket, Users, Award, TrendingUp } from 'lucide-react';
import { useStore } from '../../store';
import { SkillCard } from '../skills/SkillCard';

export function Home() {
  const { currentUser, skills, users } = useStore();
  const userSkills = skills.filter(skill => skill.userId === currentUser?.id);
  
  const stats = [
    { icon: Users, label: 'Active Users', value: '10,000+' },
    { icon: Sparkles, label: 'Skills Shared', value: '25,000+' },
    { icon: Award, label: 'Success Rate', value: '95%' },
    { icon: TrendingUp, label: 'Monthly Growth', value: '+20%' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {currentUser?.name}! 👋</h1>
        <p className="text-gray-600">Ready to continue your skill-sharing journey?</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-gray-50 rounded-lg p-4 text-center">
              <Icon className="w-6 h-6 text-primary-500 mx-auto mb-2" />
              <div className="font-bold text-xl">{value}</div>
              <div className="text-sm text-gray-600">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Skills */}
      <div>
        <h2 className="text-xl font-bold mb-4">Your Skills</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {userSkills.map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>

      {/* Recommended Matches */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recommended Matches</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {skills
            .filter(skill => skill.userId !== currentUser?.id)
            .slice(0, 4)
            .map(skill => {
              const skillUser = users.find(u => u.id === skill.userId);
              return (
                <div key={skill.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={skillUser?.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{skillUser?.name}</h3>
                      <p className="text-sm text-gray-600">{skill.name}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{skill.description}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}