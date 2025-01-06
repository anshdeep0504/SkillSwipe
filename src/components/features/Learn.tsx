import React from 'react';
import { BookOpen, Clock, Star, Play } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  duration: string;
  rating: number;
  image: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
}

const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals',
    instructor: 'Dr. Sarah Chen',
    description: 'Master the basics of machine learning algorithms and their practical applications.',
    duration: '8 weeks',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800&h=400&fit=crop',
    level: 'Beginner',
    skills: ['Python', 'Statistics', 'Machine Learning']
  },
  {
    id: '2',
    title: 'Advanced React Patterns',
    instructor: 'Michael Thompson',
    description: 'Learn advanced React patterns and best practices for building scalable applications.',
    duration: '6 weeks',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    level: 'Advanced',
    skills: ['React', 'TypeScript', 'State Management']
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    instructor: 'Emma Rodriguez',
    description: 'Master the fundamentals of user interface and experience design.',
    duration: '4 weeks',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop',
    level: 'Intermediate',
    skills: ['UI Design', 'UX Research', 'Prototyping']
  }
];

const levelColors = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-blue-100 text-blue-800',
  Advanced: 'bg-purple-100 text-purple-800'
};

export function Learn() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Featured Courses</h1>
      
      <div className="grid gap-6">
        {sampleCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button className="bg-white/90 rounded-full p-4 transform hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-primary-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                  <p className="text-gray-600 text-sm">by {course.instructor}</p>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${levelColors[course.level]}`}>
                  {course.level}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{course.rating}/5.0</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {course.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <button className="w-full flex items-center justify-center gap-2 rounded-full bg-primary-500 text-white px-6 py-2 hover:bg-primary-600 transition-colors">
                <BookOpen className="w-4 h-4" />
                <span>Start Learning</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}