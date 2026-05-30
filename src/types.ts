export interface Skill {
  name: string;
  percentage: number;
  color: string;
  icon: string;
  description: string;
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'Video Editing' | 'Motion Design' | 'Graphic Design';
  thumbnail: string;
  description: string;
  tools: string[];
  durationString: string;
  videoUrl?: string; // Mock or public video clip URL
  highlight?: string;
  embedType?: 'video' | 'motion' | 'graphics';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  priceEstimate: string;
  timeframe: string;
  highlights: string[];
}

export interface ClientInquiry {
  id: string;
  name: string;
  email: string;
  serviceType: string;
  budget: number;
  message: string;
  timestamp: string;
}
