import React from 'react';
import { MapPin, Link as LinkIcon, Calendar, Star, Book, Users, Mail, Edit, Briefcase, GraduationCap, Plus } from 'lucide-react';
import { useStore } from '../../store';
import { SkillCard } from '../skills/SkillCard';

export function Profile() {
  const { currentUser, skills } = useStore();
  const userSkills = skills.filter(skill => skill.userId === currentUser?.id);

  if (!currentUser) return null;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Profile Header */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 relative">
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="px-8 pb-8">
          <div className="flex flex-col lg:flex-row -mt-20 mb-6 gap-8">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt=""
                className="w-64 h-40 object-cover border-4 border-white shadow-lg rounded-xl"
              />
              {currentUser.verified && (
                <div className="absolute -bottom-3 right-4 bg-primary-500 text-white p-2 rounded-full">
                  <Star className="w-5 h-5" fill="currentColor" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">{currentUser.name}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-lg text-gray-600">@{currentUser.username}</p>
                    {currentUser.badges.map(badge => (
                      <span key={badge.id} className="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full font-medium">
                        {badge.type}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors font-medium">
                    <Mail className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors font-medium">
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="mt-6 space-y-4">
                <p className="text-gray-600 text-lg leading-relaxed">{currentUser.bio}</p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <span>Software Engineer at Google</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-gray-400" />
                    <span>Stanford University</span>
                  </div>
                  {currentUser.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>{currentUser.location}</span>
                    </div>
                  )}
                  {currentUser.website && (
                    <a
                      href={currentUser.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary-500 hover:underline"
                    >
                      <LinkIcon className="w-5 h-5" />
                      <span>{new URL(currentUser.website).hostname}</span>
                    </a>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span>Joined March 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center justify-center gap-2 text-gray-500 mb-2">
                <Users className="w-6 h-6" />
                <span>Following</span>
              </div>
              <span className="text-3xl font-bold text-gray-900">{currentUser.following.length}</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center justify-center gap-2 text-gray-500 mb-2">
                <Star className="w-6 h-6" />
                <span>Rating</span>
              </div>
              <span className="text-3xl font-bold text-gray-900">4.9</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center justify-center gap-2 text-gray-500 mb-2">
                <Book className="w-6 h-6" />
                <span>Skills</span>
              </div>
              <span className="text-3xl font-bold text-gray-900">{userSkills.length}</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center justify-center gap-2 text-gray-500 mb-2">
                <Users className="w-6 h-6" />
                <span>Followers</span>
              </div>
              <span className="text-3xl font-bold text-gray-900">245</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add New Skill</span>
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userSkills.map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}