export interface SuccessStory {
  id: string;
  company: string;
  logo: string;
  story: string;
  fullStory: string;
  impact: string;
  skills: string[];
  testimonial: {
    name: string;
    role: string;
    avatar: string;
    quote: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
}