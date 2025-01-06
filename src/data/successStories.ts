import { SuccessStory } from '../types/successStory';

export const successStories: SuccessStory[] = [
  {
    id: '1',
    company: 'TechFlow',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    story: 'Found our lead designer through SkillSwap who transformed our UX, leading to 60% increase in user engagement.',
    fullStory: 'TechFlow\'s journey with SkillSwap began when they were struggling with user retention. Through our platform, they connected with a senior UX designer who completely reimagined their product experience. The results were immediate and impressive, with user engagement soaring by 60% within the first three months.',
    impact: '2M+ Users Reached',
    skills: ['UI/UX Design', 'Product Design'],
    testimonial: {
      name: 'Michael Chang',
      role: 'CTO at TechFlow',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      quote: 'SkillSwap didn\'t just help us find talent - it transformed our entire approach to product design.'
    },
    metrics: [
      { label: 'User Engagement', value: '+60%' },
      { label: 'User Retention', value: '+45%' },
      { label: 'App Store Rating', value: '4.8★' }
    ]
  },
  {
    id: '2',
    company: 'AI Innovations',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
    story: 'Connected with ML experts who helped build our core AI engine, reducing processing time by 80%.',
    fullStory: 'AI Innovations was looking to optimize their machine learning models when they discovered SkillSwap. They matched with three ML experts who collaborated to rebuild their AI engine from the ground up. The optimization resulted in an 80% reduction in processing time and significant cost savings.',
    impact: '80% Faster Processing',
    skills: ['Machine Learning', 'Python', 'Deep Learning'],
    testimonial: {
      name: 'Sarah Chen',
      role: 'Lead AI Researcher',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
      quote: 'The expertise we found on SkillSwap was exactly what we needed to take our AI capabilities to the next level.'
    },
    metrics: [
      { label: 'Processing Speed', value: '+80%' },
      { label: 'Cost Savings', value: '$500K' },
      { label: 'Model Accuracy', value: '99.9%' }
    ]
  },
  {
    id: '3',
    company: 'EduTech Plus',
    logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=100&h=100&fit=crop',
    story: 'Scaled our online learning platform with help from senior developers found through SkillSwap.',
    fullStory: 'EduTech Plus needed to scale their platform to handle increasing demand. Through SkillSwap, they found experienced developers who helped rebuild their infrastructure. The platform now handles 10x more concurrent users with improved stability.',
    impact: '10x User Capacity',
    skills: ['Cloud Architecture', 'DevOps', 'Scalability'],
    testimonial: {
      name: 'David Wilson',
      role: 'CEO at EduTech Plus',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      quote: 'The talent we found on SkillSwap helped us scale beyond our expectations. Our platform is now more robust than ever.'
    },
    metrics: [
      { label: 'Concurrent Users', value: '10x' },
      { label: 'System Uptime', value: '99.99%' },
      { label: 'Load Time', value: '-65%' }
    ]
  }
];