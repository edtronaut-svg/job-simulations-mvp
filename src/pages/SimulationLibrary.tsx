import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, BarChart3, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressTracker from '../components/ProgressTracker';

const SimulationLibrary: React.FC = () => {
  const navigate = useNavigate();
  const { simulations, currentPersonalization, setCurrentSimulation } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { name: 'Developer', count: 20 },
    { name: 'Data Scientist', count: 12 },
    { name: 'Engineer', count: 15 },
    { name: 'IT Support', count: 8 },
    { name: 'Business Analyst', count: 10 },
    { name: 'Marketing Specialist', count: 9 },
    { name: 'HR / Recruiter', count: 6 },
    { name: 'Teacher / Trainer', count: 15 },
    { name: 'Designer', count: 8 }
  ];

  const getRecommendedSimulations = () => {
    if (!currentPersonalization) return simulations.slice(0, 3);
    
    return simulations.filter(sim => 
      sim.role === currentPersonalization.role ||
      sim.industry === currentPersonalization.industry ||
      sim.company === currentPersonalization.company
    ).slice(0, 3);
  };

  const getFilteredSimulations = () => {
    if (!selectedCategory) return simulations;
    return simulations.filter(sim => sim.category === selectedCategory);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartSimulation = (simulation: any) => {
    setCurrentSimulation(simulation);
    navigate(`/simulation/${simulation.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressTracker currentStep={1} />
      
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-80 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">All Roles</h2>
            <p className="text-sm text-gray-600 mb-6">120 simulations</p>
            
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  !selectedCategory ? 'bg-[#000CAD] text-white' : 'hover:bg-gray-100'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`w-full text-left px-3 py-2 rounded-lg flex justify-between items-center transition-colors ${
                    selectedCategory === category.name 
                      ? 'bg-[#000CAD] text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="text-sm opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Recommended Section */}
          {!selectedCategory && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended for You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getRecommendedSimulations().map((simulation) => (
                  <SimulationCard 
                    key={simulation.id} 
                    simulation={simulation} 
                    onStart={handleStartSimulation}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Simulations Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {selectedCategory ? `${selectedCategory} Simulations` : 'All Simulations'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredSimulations().map((simulation) => (
                <SimulationCard 
                  key={simulation.id} 
                  simulation={simulation} 
                  onStart={handleStartSimulation}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SimulationCard: React.FC<{ simulation: any; onStart: (sim: any) => void }> = ({ 
  simulation, 
  onStart 
}) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover:scale-105 card-hover">
      <img 
        src={simulation.thumbnail} 
        alt={simulation.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">
            {simulation.title}
          </h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(simulation.level)}`}>
            {simulation.level}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {simulation.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {simulation.role}
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            {simulation.industry}
          </span>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
            {simulation.company}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {simulation.skills.slice(0, 3).map((skill: string) => (
            <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {skill}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {simulation.duration}
          </div>
          
          <button
            onClick={() => onStart(simulation)}
            className="inline-flex items-center px-4 py-2 bg-[#000CAD] text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <Play className="w-4 h-4 mr-1" />
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimulationLibrary;