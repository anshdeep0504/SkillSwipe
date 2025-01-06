import { User } from '../types';
import { Skill } from '../types/skill';

// Indian tech professionals photos
const indianPhotos = [
  'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1583951561502-99140dd4bb7b?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop'
];

const indianColleges = [
  'IIT Bombay',
  'IIT Delhi',
  'IIT Madras',
  'IIT Kanpur',
  'BITS Pilani',
  'IIIT Hyderabad',
  'NIT Trichy',
  'VIT Vellore',
  'Manipal Institute of Technology',
  'Delhi Technological University'
];

const indianCompanies = [
  'Infosys',
  'TCS',
  'Wipro',
  'HCL Technologies',
  'Tech Mahindra',
  'Flipkart',
  'Swiggy',
  'CRED',
  'Razorpay',
  'Zerodha'
];

const indianNames = [
  'Arjun Patel | CSE \'23',
  'Priya Sharma | AI \'23',
  'Aditya Verma | ML \'23',
  'Neha Gupta | CSE \'23',
  'Rohan Mehta | AI \'23',
  'Ananya Singh | ML \'23',
  'Vikram Reddy | CSE \'23',
  'Kavya Iyer | AI \'23',
  'Rahul Kumar | ML \'23',
  'Shreya Desai | CSE \'23',
  'Karthik Raj | AI \'23',
  'Meera Nair | ML \'23',
  'Dev Malhotra | CSE \'23',
  'Riya Kapoor | AI \'23',
  'Aryan Shah | ML \'23'
];

const codingSkills = [
  {
    name: 'Full-Stack Development',
    descriptions: [
      'Building scalable web applications using MERN stack. Currently working on microservices architecture.',
      'Experienced in developing enterprise applications with Spring Boot and React.',
      'Specialized in cloud-native development with AWS. Contributing to open source projects.'
    ]
  },
  {
    name: 'Machine Learning',
    descriptions: [
      'Research focus on computer vision and deep learning. Published papers at top conferences.',
      'Working on NLP and transformer models. Passionate about AI ethics.',
      'Specialized in recommendation systems. Building ML pipelines for production.'
    ]
  },
  {
    name: 'Mobile Development',
    descriptions: [
      'Android development with Kotlin and Jetpack Compose. Published multiple apps on Play Store.',
      'Cross-platform development with Flutter. Creating smooth, native-like experiences.',
      'iOS specialist focusing on SwiftUI. Contributing to mobile frameworks.'
    ]
  },
  {
    name: 'DevOps & Cloud',
    descriptions: [
      'Kubernetes expert with focus on scalable architectures. AWS certified solutions architect.',
      'Specialized in CI/CD pipelines and infrastructure as code.',
      'Cloud architect with multi-cloud experience. Building resilient systems.'
    ]
  }
];

// Generate realistic Indian tech profiles
const generateProfiles = (): User[] => {
  const profiles: User[] = [];
  
  for (let i = 0; i < 50; i++) {
    const name = indianNames[i % indianNames.length];
    const photo = indianPhotos[i % indianPhotos.length];
    const college = indianColleges[i % indianColleges.length];
    const company = indianCompanies[i % indianCompanies.length];
    const skill = codingSkills[i % codingSkills.length];
    
    profiles.push({
      id: crypto.randomUUID(),
      name,
      username: name.split('|')[0].trim().toLowerCase().replace(/\s/g, ''),
      avatar: photo,
      bio: `${college} ${name.split('|')[1].trim()} | ${company} | ${skill.descriptions[Math.floor(Math.random() * skill.descriptions.length)]}`,
      location: ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Chennai', 'Gurgaon'][Math.floor(Math.random() * 7)],
      following: [],
      badges: [{ id: crypto.randomUUID(), type: 'verified', icon: 'check' }],
      theme: 'light',
      interests: ['AI/ML', 'System Design', 'Open Source'],
      verified: true,
      analytics: {
        totalTweets: 0,
        totalLikes: 0,
        totalFollowers: 0,
        engagementRate: 0,
        reachByDay: {}
      },
      preferences: {
        theme: 'light',
        language: 'en',
        contentFilter: 'medium',
        autoTranslate: false,
        notifications: {
          likes: true,
          replies: true,
          mentions: true,
          follows: true,
          messages: true
        }
      },
      bookmarks: [],
      muted: [],
      blocked: []
    });
  }
  
  return profiles;
};

// Generate coding-specific skills
const generateSkills = (users: User[]): Skill[] => {
  const skills: Skill[] = [];
  
  users.forEach((user) => {
    const skill = codingSkills[Math.floor(Math.random() * codingSkills.length)];
    skills.push({
      id: crypto.randomUUID(),
      name: skill.name,
      category: 'technology',
      level: Math.random() > 0.5 ? 'advanced' : 'expert',
      description: skill.descriptions[Math.floor(Math.random() * skill.descriptions.length)],
      userId: user.id,
      createdAt: new Date().toISOString()
    });
  });

  return skills;
};

export const sampleUsers = generateProfiles();
export const sampleSkills = generateSkills(sampleUsers);