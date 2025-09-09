import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Target, TrendingUp, User, ArrowRight, Award, Briefcase, Star, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressTracker from '../components/ProgressTracker';

const Assessment: React.FC = () => {
  const navigate = useNavigate();
  const { currentSimulation, user } = useApp();

  // Mock assessment data
  const assessmentData = {
    score: 85,
    skillsScores: [
      { name: 'Problem Solving', score: 90 },
      { name: 'Communication', score: 85 },
      { name: 'Technical Knowledge', score: 80 },
      { name: 'Customer Service', score: 88 }
    ],
    feedback: 'Great job on this simulation! You demonstrated strong technical support skills and maintained excellent customer service throughout. Your approach to the password reset issue was methodical and user-friendly.'
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressTracker currentStep={3} />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#12EDA6] rounded-full mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Simulation Complete!
          </h1>
          <p className="text-xl text-gray-600">
            {currentSimulation?.title || 'Assessment Results'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Overall Score */}
          <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
            <div className="flex items-center mb-4">
              <Target className="w-6 h-6 text-[#000CAD] mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Overall Score</h2>
            </div>
            
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="100, 100"
                    className="text-gray-200"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${assessmentData.score}, 100`}
                    className="text-[#12EDA6]"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-3xl font-bold ${getScoreColor(assessmentData.score)}`}>
                    {assessmentData.score}%
                  </span>
                </div>
              </div>
              <p className="text-gray-600">Excellent Performance!</p>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-[#000CAD] mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Skills Practiced</h2>
            </div>
            
            <div className="space-y-4">
              {assessmentData.skillsScores.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <span className={`text-sm font-semibold ${getScoreColor(skill.score)}`}>
                      {skill.score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getScoreBarColor(skill.score)}`}
                      style={{ width: `${skill.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Feedback */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Feedback</h2>
          <p className="text-gray-700">{assessmentData.feedback}</p>
        </div>

        {/* Guest Mode CTA */}
        {!user && (
          <div className="relative bg-gradient-to-br from-[#000CAD] via-blue-600 to-[#12EDA6] rounded-2xl shadow-2xl p-1 text-center overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(0, 12, 173, 0.3)' }}>
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#12EDA6] opacity-20 rounded-full -mr-16 -mt-16 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12 animate-float"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#12EDA6] opacity-15 rounded-full animate-float-delay"></div>
            
            {/* Inner content container */}
            <div className="bg-white rounded-xl p-8 relative z-10">
            <h2 className="text-4xl font-bold mb-8 bg-[#000CAD]  bg-clip-text text-transparent" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Unlock Your Full Potential
            </h2>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 text-left">
              <div className="group hover:transform hover:scale-105 hover:shadow-lg transition-all duration-300 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-[#000CAD]/10">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#000CAD] rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#000CAD] mb-2 text-xl">
                      Professional Certificates
                    </h3>
                    <p className="text-[#4B4B4B] text-base leading-relaxed">
                      Official credentials to showcase your expertise and boost your career opportunities
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group hover:transform hover:scale-105 hover:shadow-lg transition-all duration-300 p-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-[#12EDA6]/20">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#12EDA6] rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6m8 0H8m0 0h.01M8 0h.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#000CAD] mb-2 text-xl">
                      Exclusive Job Recommendations
                    </h3>
                    <p className="text-[#4B4B4B] text-base leading-relaxed">
                      Personalized job matches based on your simulation performance
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group hover:transform hover:scale-105 hover:shadow-lg transition-all duration-300 p-6 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-[#000CAD]/15">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#6025ED] rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#000CAD] mb-2 text-xl">
                      Real-world Simulations
                    </h3>
                    <p className="text-[#4B4B4B] text-base leading-relaxed">
                      Hands-on practice with realistic workplace scenarios
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group hover:transform hover:scale-105 hover:shadow-lg transition-all duration-300 p-6 rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50 border border-[#12EDA6]/25">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#FFBF00] to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#000CAD] mb-2 text-xl">
                      Personalized Mentorship
                    </h3>
                    <p className="text-[#4B4B4B] text-base leading-relaxed">
                      Optimize your CV with CV PowerUp and receive dedicated guidance from Mentoring 1:1
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/auth')}
                className="px-8 py-4 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
                style={{ 
                  background: '#000CAD',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}
              >
                Sign Up & Build Real-World Skills
              </button>
              
              <button
                onClick={() => navigate('/auth')}
                className="px-8 py-4 text-[#000CAD] border-2 border-[#000CAD] rounded-xl hover:bg-[#000CAD] hover:text-white transition-all duration-300 font-bold text-lg"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Already have an account? Sign in
              </button>
            </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-center">
          {user && (
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-[#000CAD] text-white rounded-lg hover:bg-blue-800 transition-all duration-200"
            >
              Go to Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;