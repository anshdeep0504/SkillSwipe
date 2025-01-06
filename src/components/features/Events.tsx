import React from 'react';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: 'workshop' | 'webinar' | 'hackathon' | 'meetup';
  image: string;
  attendees: number;
  skillCategories: string[];
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Full-Stack Development Workshop',
    description: 'Learn modern web development with React and Node.js. Build a real-world application from scratch.',
    date: '2024-04-15T10:00:00Z',
    location: 'San Francisco, CA',
    type: 'workshop',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=400&fit=crop',
    attendees: 45,
    skillCategories: ['Web Development', 'JavaScript', 'React']
  },
  {
    id: '2',
    title: 'AI/ML Virtual Hackathon',
    description: 'Join developers worldwide to build innovative AI solutions. $10,000 in prizes!',
    date: '2024-05-01T09:00:00Z',
    location: 'Online',
    type: 'hackathon',
    image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&h=400&fit=crop',
    attendees: 200,
    skillCategories: ['Machine Learning', 'Python', 'Data Science']
  },
  {
    id: '3',
    title: 'UX Design Masterclass',
    description: 'Learn advanced UX design principles from industry experts.',
    date: '2024-04-20T14:00:00Z',
    location: 'London, UK',
    type: 'webinar',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=400&fit=crop',
    attendees: 150,
    skillCategories: ['UI/UX Design', 'Product Design']
  }
];

export function Events() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>
      
      <div className="grid gap-6">
        {sampleEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                </div>
                
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                  {event.type}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{event.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {event.skillCategories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                  >
                    {category}
                  </span>
                ))}
              </div>
              
              <button className="w-full flex items-center justify-center gap-2 rounded-full bg-primary-500 text-white px-6 py-2 hover:bg-primary-600 transition-colors">
                <span>Register Now</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}