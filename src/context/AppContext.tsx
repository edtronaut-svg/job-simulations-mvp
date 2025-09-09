import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  industry: string;
  company: string;
}

interface Simulation {
  id: string;
  title: string;
  description: string;
  role: string;
  industry: string;
  company: string;
  skills: string[];
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  thumbnail: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  currentPersonalization: {
    role: string;
    industry: string;
    company: string;
  } | null;
  setCurrentPersonalization: (personalization: any) => void;
  simulations: Simulation[];
  currentSimulation: Simulation | null;
  setCurrentSimulation: (simulation: Simulation | null) => void;
  simulationProgress: any;
  setSimulationProgress: (progress: any) => void;
  completedSimulations: string[];
  setCompletedSimulations: (completed: string[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPersonalization, setCurrentPersonalization] = useState(null);
  const [currentSimulation, setCurrentSimulation] = useState<Simulation | null>(null);
  const [simulationProgress, setSimulationProgress] = useState({});
  const [completedSimulations, setCompletedSimulations] = useState<string[]>([]);

  const simulations: Simulation[] = [
    {
      id: '1',
      title: 'Password Reset Support',
      description: 'Handle user lockout after failed login attempts at Google',
      role: 'IT Support Specialist',
      industry: 'Technology',
      company: 'Google',
      skills: ['Customer Service', 'Technical Support', 'Problem Solving'],
      duration: '15 min',
      level: 'Beginner',
      category: 'IT Support',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Facebook Reach Strategy',
      description: 'Adapt content strategy after algorithm changes at Facebook',
      role: 'Content Creator',
      industry: 'Marketing',
      company: 'Facebook',
      skills: ['Content Strategy', 'Social Media', 'Analytics'],
      duration: '20 min',
      level: 'Intermediate',
      category: 'Marketing Specialist',
      thumbnail: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'AWS Infrastructure Setup',
      description: 'Design scalable cloud architecture for e-commerce platform',
      role: 'Software Engineer',
      industry: 'Technology',
      company: 'Amazon',
      skills: ['Cloud Computing', 'AWS', 'System Design'],
      duration: '45 min',
      level: 'Advanced',
      category: 'Developer',
      thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '4',
      title: 'Sales Pipeline Optimization',
      description: 'Improve lead conversion rates for enterprise clients',
      role: 'Account Executive',
      industry: 'E-commerce',
      company: 'Bosch',
      skills: ['Sales Strategy', 'CRM', 'Lead Management'],
      duration: '30 min',
      level: 'Intermediate',
      category: 'Business Analyst',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '5',
      title: 'User Experience Analysis',
      description: 'Improve mobile app usability for Zalo messaging platform',
      role: 'Designer',
      industry: 'Technology',
      company: 'Zalo',
      skills: ['UX Design', 'User Research', 'Prototyping'],
      duration: '35 min',
      level: 'Intermediate',
      category: 'Designer',
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '6',
      title: 'Payment Fraud Detection',
      description: 'Analyze transaction patterns to prevent fraud at Momo',
      role: 'Data Analyst',
      industry: 'Finance',
      company: 'Momo',
      skills: ['Data Analysis', 'Machine Learning', 'Risk Assessment'],
      duration: '40 min',
      level: 'Advanced',
      category: 'Data Scientist',
      thumbnail: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        currentPersonalization,
        setCurrentPersonalization,
        simulations,
        currentSimulation,
        setCurrentSimulation,
        simulationProgress,
        setSimulationProgress,
        completedSimulations,
        setCompletedSimulations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};