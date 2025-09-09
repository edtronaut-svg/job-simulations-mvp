import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RotateCcw, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useApp();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Personalization';
      case '/library':
        return 'Simulation Library';
      case '/assessment':
        return 'Assessment & Feedback';
      case '/auth':
        return 'Sign In';
      case '/dashboard':
        return 'Dashboard';
      default:
        if (location.pathname.includes('/simulation/')) {
          return 'Simulation Workspace';
        }
        return 'SORA';
    }
  };

  const handleRestart = () => {
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-[#000CAD]">SORA</h1>
            </div>
          </div>

          {/* Page Title */}
          <div className="flex-1 text-center">
            <h2 className="text-lg font-semibold text-gray-900">{getPageTitle()}</h2>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700">{user.name}</span>
              </div>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="text-sm text-[#000CAD] hover:text-blue-800 font-medium transition-all duration-200 hover:scale-105"
              >
                Sign In
              </button>
            )}
            
            <button
              onClick={handleRestart}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-[#000CAD] transition-all duration-200 hover:scale-105 rounded-lg hover:bg-gray-50"
              title="Restart"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;