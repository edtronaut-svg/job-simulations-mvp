import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MessageCircle, Lightbulb, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressTracker from '../components/ProgressTracker';

const SimulationWorkspace: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { simulations, simulationProgress, setSimulationProgress } = useApp();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedChoice, setSelectedChoice] = useState('');
  const [feedback, setFeedback] = useState('');
  const [activeAI, setActiveAI] = useState<'coworker' | 'mentor' | 'resource'>('coworker');

  const simulation = simulations.find(sim => sim.id === id);

  if (!simulation) {
    return <div>Simulation not found</div>;
  }

  // Mock simulation data based on the simulation type
  const getSimulationSteps = () => {
    if (simulation.id === '1') {
      // IT Support - Password Reset
      return [
        {
          type: 'message',
          title: 'New Support Ticket',
          content: 'Ticket #12345: "I can\'t log into my account. I\'ve tried my password several times, now I\'m locked out. This is urgent, I have a presentation in 30 minutes!"',
          customerName: 'Sarah Johnson',
          department: 'Marketing'
        },
        {
          type: 'choice',
          title: 'First Response',
          question: 'How should you respond to this user?',
          options: [
            { id: 'a', text: 'Acknowledge frustration, explain lockout, guide reset process', correct: true },
            { id: 'b', text: 'Tell them to wait 15 minutes and try again', correct: false },
            { id: 'c', text: 'Ask them to contact their manager first', correct: false }
          ]
        },
        {
          type: 'choice',
          title: 'Reset Process',
          question: 'What\'s the best way to guide them through password reset?',
          options: [
            { id: 'a', text: 'Click "Forgot Password", enter email, get reset link', correct: true },
            { id: 'b', text: 'Reinstall the application completely', correct: false },
            { id: 'c', text: 'Create a new account with different email', correct: false }
          ]
        },
        {
          type: 'input',
          title: 'Support Message',
          question: 'Write a professional support message (2-3 sentences: empathy + instructions + knowledge base link)',
          placeholder: 'Hi Sarah, I understand how frustrating this must be...'
        }
      ];
    } else if (simulation.id === '2') {
      // Content Creator - Facebook Strategy
      return [
        {
          type: 'message',
          title: 'Algorithm Challenge',
          content: 'Facebook has updated their algorithm in 2016. Your company Buffer has seen a 50% drop in organic reach. Management wants to maintain posting frequency but you have limited resources.',
        },
        {
          type: 'choice',
          title: 'Strategic Response',
          question: 'How should you adapt your content strategy?',
          options: [
            { id: 'a', text: 'Reduce posting frequency by 50%, focus on quality content', correct: true },
            { id: 'b', text: 'Post more frequently to combat the algorithm', correct: false },
            { id: 'c', text: 'Keep the same strategy and wait it out', correct: false }
          ]
        },
        {
          type: 'choice',
          title: 'Content Type',
          question: 'What type of content should you prioritize?',
          options: [
            { id: 'a', text: 'Videos with storytelling captions that encourage engagement', correct: true },
            { id: 'b', text: 'Short links with minimal text', correct: false },
            { id: 'c', text: 'Stock photos with generic captions', correct: false }
          ]
        },
        {
          type: 'input',
          title: 'Facebook Post',
          question: 'Draft a Facebook post that includes storytelling, encourages engagement, and mentions video content',
          placeholder: 'Here\'s something we learned about social media...'
        }
      ];
    }
    
    // Default simulation steps
    return [
      {
        type: 'message',
        title: 'Welcome to the Simulation',
        content: `You're starting the ${simulation.title} simulation. This will test your skills in ${simulation.skills.join(', ')}.`
      },
      {
        type: 'choice',
        title: 'First Challenge',
        question: 'How would you approach this situation?',
        options: [
          { id: 'a', text: 'Analyze the problem systematically', correct: true },
          { id: 'b', text: 'Jump straight to a solution', correct: false },
          { id: 'c', text: 'Ask for help immediately', correct: false }
        ]
      },
      {
        type: 'input',
        title: 'Your Response',
        question: 'Describe your approach to solving this challenge',
        placeholder: 'Enter your detailed response here...'
      }
    ];
  };

  const steps = getSimulationSteps();
  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStepData.type === 'choice' && !selectedChoice) {
      setFeedback('Please select an answer before continuing.');
      return;
    }
    if (currentStepData.type === 'input' && !userAnswer.trim()) {
      setFeedback('Please provide an answer before continuing.');
      return;
    }

    // Provide feedback for choice questions
    if (currentStepData.type === 'choice') {
      const selected = currentStepData.options.find(opt => opt.id === selectedChoice);
      if (selected?.correct) {
        setFeedback('Correct! Great choice.');
      } else {
        setFeedback('That\'s not the best approach. The correct answer would be: ' + 
          currentStepData.options.find(opt => opt.correct)?.text);
      }
      
      // Store progress
      setSimulationProgress({
        ...simulationProgress,
        [id!]: {
          ...simulationProgress[id!],
          [currentStep]: { choice: selectedChoice, correct: selected?.correct }
        }
      });
    }

    if (currentStepData.type === 'input') {
      setFeedback('Response recorded. Great work!');
      setSimulationProgress({
        ...simulationProgress,
        [id!]: {
          ...simulationProgress[id!],
          [currentStep]: { answer: userAnswer }
        }
      });
    }

    if (currentStep < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setSelectedChoice('');
        setUserAnswer('');
        setFeedback('');
      }, 2000);
    } else {
      // Simulation complete
      setTimeout(() => {
        navigate('/assessment');
      }, 2000);
    }
  };

  const AIContent = {
    coworker: {
      title: 'AI Co-worker',
      icon: MessageCircle,
      content: `Hi! I'm your AI co-worker. For this ${simulation.title} simulation, I can help you brainstorm solutions and think through the problem together. What aspects would you like to discuss?`
    },
    mentor: {
      title: 'AI Mentor',
      icon: Lightbulb,
      content: `As your AI mentor, I'm here to guide you through best practices for ${simulation.role} tasks. Remember to always consider the user's perspective and follow company protocols.`
    },
    resource: {
      title: 'AI Resource',
      icon: BookOpen,
      content: `Access knowledge base articles, documentation, and reference materials related to ${simulation.skills.join(', ')}. Need specific information about company policies or technical procedures?`
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressTracker currentStep={2} />
      
      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Panel - Main Content */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="flex-1 p-8 overflow-y-auto">
            {/* Progress indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#000CAD] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Task Content */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {currentStepData.title}
              </h2>

              {currentStepData.type === 'message' && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
                  <p className="text-gray-800">{currentStepData.content}</p>
                  {currentStepData.customerName && (
                    <div className="mt-4 text-sm text-gray-600">
                      <p><strong>From:</strong> {currentStepData.customerName}</p>
                      <p><strong>Department:</strong> {currentStepData.department}</p>
                    </div>
                  )}
                </div>
              )}

              {currentStepData.type === 'choice' && (
                <div>
                  <p className="text-gray-700 mb-6">{currentStepData.question}</p>
                  <div className="space-y-4">
                    {currentStepData.options.map((option) => (
                      <label
                        key={option.id}
                        className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedChoice === option.id
                            ? 'border-[#000CAD] bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="choice"
                          value={option.id}
                          checked={selectedChoice === option.id}
                          onChange={(e) => setSelectedChoice(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                            selectedChoice === option.id
                              ? 'border-[#000CAD] bg-[#000CAD]'
                              : 'border-gray-300'
                          }`}>
                            {selectedChoice === option.id && (
                              <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                            )}
                          </div>
                          <span className="text-gray-800">{option.text}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {currentStepData.type === 'input' && (
                <div>
                  <p className="text-gray-700 mb-4">{currentStepData.question}</p>
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder={currentStepData.placeholder}
                    rows={6}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#000CAD] focus:border-transparent resize-none"
                  />
                </div>
              )}
            </div>

            {/* Feedback Area */}
            {feedback && (
              <div className={`p-4 rounded-lg mb-6 ${
                feedback.includes('Correct') 
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : feedback.includes('not the best') 
                  ? 'bg-red-50 border border-red-200 text-red-800'
                  : 'bg-blue-50 border border-blue-200 text-blue-800'
              }`}>
                {feedback}
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex justify-between">
              <button
                onClick={() => navigate('/library')}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Library
              </button>
              
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 bg-[#000CAD] text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                {currentStep < steps.length - 1 ? 'Next' : 'Complete'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - AI Assistants */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          {/* AI Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {Object.entries(AIContent).map(([key, ai]) => {
                const Icon = ai.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveAI(key as any)}
                    className={`flex-1 p-4 text-sm font-medium border-b-2 transition-colors ${
                      activeAI === key
                        ? 'border-[#000CAD] text-[#000CAD] bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5 mx-auto mb-1" />
                    {ai.title.replace('AI ', '')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Content */}
          <div className="flex-1 p-6">
            <div className="flex items-center mb-4">
              {React.createElement(AIContent[activeAI].icon, { 
                className: "w-6 h-6 text-[#000CAD] mr-2" 
              })}
              <h3 className="text-lg font-semibold text-gray-900">
                {AIContent[activeAI].title}
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {AIContent[activeAI].content}
            </p>
            
            {/* Interactive AI Chat Area */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500 mb-2">Ask me anything:</div>
              <input
                type="text"
                placeholder="Type your question..."
                className="w-full p-2 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-[#000CAD] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationWorkspace;