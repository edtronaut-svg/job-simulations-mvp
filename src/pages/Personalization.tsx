import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Users, Building2, Globe, Code, Palette, BarChart3, Headphones, TrendingUp, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressTracker from '../components/ProgressTracker';

const Personalization: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentPersonalization } = useApp();
  
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');

  const roles = [
    { name: 'IT Support Specialist', count: 24, icon: Headphones },
    { name: 'Content Creator', count: 18, icon: Palette },
    { name: 'Software Engineer', count: 32, icon: Code },
    { name: 'Data Analyst', count: 21, icon: BarChart3 },
    { name: 'Designer', count: 16, icon: Palette },
    { name: 'Account Executive', count: 19, icon: TrendingUp }
  ];

  const industries = [
    { name: 'Technology', count: 45, icon: Code },
    { name: 'Marketing', count: 28, icon: TrendingUp },
    { name: 'Finance', count: 22, icon: DollarSign },
    { name: 'E-commerce', count: 31, icon: Globe },
    { name: 'Design', count: 19, icon: Palette },
    { name: 'Operations', count: 25, icon: BarChart3 }
  ];

  const companies = [
    { name: 'Google', count: 28, icon: '🔍' },
    { name: 'Facebook', count: 22, icon: '👥' },
    { name: 'Amazon', count: 35, icon: '📦' },
    { name: 'Bosch', count: 18, icon: '⚙️' },
    { name: 'Zalo', count: 15, icon: '💬' },
    { name: 'Momo', count: 12, icon: '💰' }
  ];

  const handleContinue = () => {
    const roleObj = roles.find(r => r.name === selectedRole);
    const industryObj = industries.find(i => i.name === selectedIndustry);
    const companyObj = companies.find(c => c.name === selectedCompany);
    
    if (roleObj && industryObj && companyObj) {
      setCurrentPersonalization({
        role: roleObj.name,
        industry: industryObj.name,
        company: companyObj.name
      });
      navigate('/library');
    }
  };

  const isComplete = selectedRole && selectedIndustry && selectedCompany;

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressTracker currentStep={0} />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Customize Your Experience
          </h1>
          <p className="text-xl text-gray-600">
            Select your preferences to get personalized job simulations
          </p>
          
          {/* Progress Indicator */}
          <div className="flex justify-center items-center mt-8 mb-4">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                selectedRole ? 'bg-[#000CAD] text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className={`w-12 h-0.5 ${selectedRole ? 'bg-[#000CAD]' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                selectedIndustry ? 'bg-[#000CAD] text-white' : selectedRole ? 'bg-[#12EDA6] text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <div className={`w-12 h-0.5 ${selectedIndustry ? 'bg-[#000CAD]' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                selectedCompany ? 'bg-[#000CAD] text-white' : selectedIndustry ? 'bg-[#12EDA6] text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <span className={selectedRole ? 'text-[#000CAD] font-medium' : ''}>Role</span>
            <span className={selectedIndustry ? 'text-[#000CAD] font-medium' : selectedRole ? 'text-[#12EDA6] font-medium' : ''}>Industry</span>
            <span className={selectedCompany ? 'text-[#000CAD] font-medium' : selectedIndustry ? 'text-[#12EDA6] font-medium' : ''}>Company</span>
          </div>
        </div>

        <div className="space-y-12">
          {/* Role Selection */}
          <div>
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-[#000CAD] mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Select Your Role</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {roles.map((role) => (
                <div
                  key={role.name}
                  onClick={() => setSelectedRole(role.name)}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 card-hover ${
                    selectedRole === role.name
                      ? 'border-[#000CAD] bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <role.icon className="w-6 h-6 text-[#000CAD] mr-3" />
                    <h3 className="font-semibold text-gray-900">{role.name}</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {role.count} simulations
                    </span>
                    {selectedRole === role.name && (
                      <div className="w-5 h-5 bg-[#000CAD] rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Selection */}
          <div>
            <div className="flex items-center mb-6">
              <Building2 className="w-6 h-6 text-[#000CAD] mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Select Your Industry</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {industries.map((industry) => (
                <div
                  key={industry.name}
                  onClick={() => setSelectedIndustry(industry.name)}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 card-hover ${
                    selectedIndustry === industry.name
                      ? 'border-[#000CAD] bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <industry.icon className="w-6 h-6 text-[#000CAD] mr-3" />
                    <h3 className="font-semibold text-gray-900">{industry.name}</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {industry.count} simulations
                    </span>
                    {selectedIndustry === industry.name && (
                      <div className="w-5 h-5 bg-[#000CAD] rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Company Selection */}
          <div>
            <div className="flex items-center mb-6">
              <Globe className="w-6 h-6 text-[#000CAD] mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Select Your Company</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companies.map((company) => (
                <div
                  key={company.name}
                  onClick={() => setSelectedCompany(company.name)}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 card-hover ${
                    selectedCompany === company.name
                      ? 'border-[#000CAD] bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{company.icon}</span>
                    <h3 className="font-semibold text-gray-900">{company.name}</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {company.count} simulations
                    </span>
                    {selectedCompany === company.name && (
                      <div className="w-5 h-5 bg-[#000CAD] rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-16 text-center">
          <button
            onClick={handleContinue}
            disabled={!isComplete}
            className={`inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 ${
              isComplete
                ? 'bg-[#000CAD] text-white hover:bg-blue-800 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Generate My Simulation Library
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Personalization;