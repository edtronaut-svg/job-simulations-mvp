import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Award, 
  TrendingUp, 
  Clock, 
  Target, 
  Play,
  Download,
  Star,
  BarChart3,
  Trophy,
  Medal,
  Crown,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, simulations, completedSimulations } = useApp();

  // Mock dashboard data
  const dashboardData = {
    totalSimulations: 120,
    completed: 15,
    inProgress: 3,
    overallProgress: Math.round((15 / 120) * 100), // 13%
    certificates: [
      {
        id: '1',
        title: 'IT Support Specialist',
        company: 'Google',
        level: 'Beginner',
        completedDate: '2025-01-15',
        score: 85
      },
      {
        id: '2',
        title: 'Content Creator',
        company: 'Facebook',
        level: 'Intermediate',
        completedDate: '2025-01-14',
        score: 92
      }
    ],
    inProgressSims: [
      {
        id: '3',
        title: 'AWS Infrastructure Setup',
        progress: 60,
        timeRemaining: '20 min'
      },
      {
        id: '4',
        title: 'Sales Pipeline Optimization',
        progress: 30,
        timeRemaining: '25 min'
      }
    ],
    jobRecommendations: [
      {
        id: 'job1',
        title: 'IT Support Specialist',
        company: 'Google',
        location: 'Remote',
        type: 'Full-time',
        match: '95%'
      },
      {
        id: 'job2',
        title: 'Technical Support Engineer',
        company: 'Microsoft',
        location: 'Seattle, WA',
        type: 'Full-time',
        match: '88%'
      },
      {
        id: 'job3',
        title: 'Customer Success Specialist',
        company: 'Salesforce',
        location: 'San Francisco, CA',
        type: 'Full-time',
        match: '82%'
      },
      {
        id: 'job4',
        title: 'Content Marketing Manager',
        company: 'Facebook',
        location: 'New York, NY',
        type: 'Full-time',
        match: '79%'
      }
    ],
    simulationRecommendations: simulations.slice(0, 4),
    recommendedSims: simulations.slice(0, 4)
  };

const StatCard = ({ icon: Icon, title, value, subtitle }) => ( <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300"> <div className="flex items-center"> <div className="p-3 rounded-lg bg-blue-50 mr-4"> <Icon className="w-6 h-6 text-blue-600" /> </div> <div> <h3 className="text-2xl font-bold text-gray-900">{value}</h3> <p className="text-gray-600 font-medium">{title}</p> {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>} </div> </div> </div>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => navigate('/library')}
              className="flex items-center px-4 py-4 text-gray-600 hover:text-[#000CAD] border-b-2 border-transparent hover:border-[#000CAD] transition-all font-medium"
            >
              Explore
            </button>
            <button className="flex items-center px-4 py-4 text-[#000CAD] border-b-2 border-[#000CAD] font-bold">
              Dashboard
            </button>
            <button className="flex items-center px-4 py-4 text-gray-600 hover:text-[#000CAD] border-b-2 border-transparent hover:border-[#000CAD] transition-all font-medium">
              Jobs
            </button>
            <button className="flex items-center px-4 py-4 text-gray-600 hover:text-[#000CAD] border-b-2 border-transparent hover:border-[#000CAD] transition-all font-medium">
              CV PowerUp
            </button>
            <button className="flex items-center px-4 py-4 text-gray-600 hover:text-[#000CAD] border-b-2 border-transparent hover:border-[#000CAD] transition-all font-medium">
              Mentoring 1:1
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Continue your learning journey and improve your professional skills.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            icon={Clock}
            title="Ongoing"
            value={dashboardData.inProgress}
            subtitle="Simulations"
          />
          <StatCard
            icon={Award}
            title="Completed"
            value={dashboardData.completed}
            subtitle="Simulations"
          />
          <StatCard
            icon={Star}
            title="Developed"
            value={dashboardData.completed}
            subtitle="Skills"
          />
          <StatCard
            icon={TrendingUp}
            title="Learned"
            value={dashboardData.completed}
            subtitle="Streak Days"
          />
          <StatCard
            icon={Trophy}
            title="Achieved"
            value={dashboardData.certificates.length}
            subtitle="Certificates"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* In Progress Simulations */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">In Progress Simulations</h2>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {dashboardData.inProgressSims.slice(0, 2).map((sim) => (
                  <div key={sim.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-[#000CAD]">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{sim.title}</h3>
                      <span className="text-sm text-gray-500">{sim.timeRemaining} left</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className="bg-[#000CAD] h-2 rounded-full"
                        style={{ width: `${sim.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{sim.progress}% complete</span>
                      <button
                        onClick={() => navigate(`/simulation/${sim.id}`)}
                        className="inline-flex items-center px-3 py-1 text-sm bg-[#000CAD] text-white rounded hover:bg-blue-800 transition-all duration-200"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Continue
                      </button>
                    </div>
                  </div>
                ))}
                
                {dashboardData.inProgressSims.length > 2 && (
                  <button className="w-full text-center py-3 text-[#000CAD] hover:text-blue-800 text-sm font-medium border border-[#000CAD] rounded-lg hover:bg-blue-50 transition-all duration-200">
                    More ({dashboardData.inProgressSims.length - 2} more simulations)
                  </button>
                )}
              </div>
            </div>

            {/* Certificates */}
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-2xl p-10 border-2 border-[#000CAD] relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#000CAD] to-[#12EDA6] opacity-10 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#12EDA6] to-[#000CAD] opacity-10 rounded-full -ml-16 -mb-16"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#000CAD] to-[#12EDA6] opacity-5 rounded-full"></div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-[#000CAD] to-[#12EDA6] p-5 rounded-2xl mr-6 shadow-xl relative">
                    <Award className="w-10 h-10 text-white relative z-10" />
                    <div className="absolute inset-0 bg-[#12EDA6] rounded-2xl "></div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-[#000CAD] bg-clip-text text-transparent">
                      Your Certificates
                    </h2>
                    <p className="text-gray-700 text-l font-medium">Professional achievements ready for download</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-[#000CAD] to-[#12EDA6] text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#000CAD]"></div>
                  <span className="relative z-10">
                  {dashboardData.certificates.length} Earned
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                {dashboardData.certificates.map((cert) => (
                  <div key={cert.id} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 relative overflow-hidden hover:scale-105">
                    {/* Certificate image placeholder */}
                    
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <div className="bg-[#12EDA6] p-2 rounded-lg mr-3">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-2xl">{cert.title}</h3>
                        </div>
                        <p className="text-[#000CAD] font-bold text-xl">{cert.company} • {cert.level}</p>
                        <p className="text-gray-600 mt-2 font-medium">Completed on {cert.completedDate}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-3">
                          <div className="bg-[#FFBF00] p-2 rounded-lg mr-2">
                            <Star className="w-6 h-6 text-white" />
                          </div>
                          <span className="font-bold text-gray-900 text-3xl">{cert.score}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="flex items-center text-gray-600">
                        <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-3"></div>
                        <span className="font-semibold text-lg">Verified Achievement</span>
                      </div>
                      <div className="flex space-x-3">
                        <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#000CAD] to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-[#000CAD] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold">
                          <Download className="w-4 h-4 mr-2" />
                          Download Certificate
                        </button>
                        <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#12EDA6] to-green-500 text-white rounded-xl hover:from-green-500 hover:to-[#12EDA6] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                          </svg>
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {dashboardData.certificates.length === 0 && (
                  <div className="text-center py-16">
                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
                      <Award className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">No certificates yet</h3>
                    <p className="text-gray-600 mb-8 text-xl">Complete simulations to earn your first certificate!</p>
                    <button
                      onClick={() => navigate('/library')}
                      className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-[#000CAD] to-[#12EDA6] text-white rounded-2xl hover:from-[#12EDA6] hover:to-[#000CAD] transition-all duration-300 font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                      Start a Simulation
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Job Recommendations */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Briefcase className="w-5 h-5 text-[#000CAD] mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Job Recommendations</h2>
              </div>
              
              <div className="space-y-3">
                {dashboardData.jobRecommendations.slice(0, 3).map((job) => (
                  <div key={job.id} className="p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{job.title}</h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{job.match}</span>
                    </div>
                    <p className="text-xs text-gray-600">{job.company}</p>
                    <p className="text-xs text-gray-500">{job.location} • {job.type}</p>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 px-4 py-2 text-sm text-[#000CAD] border border-[#000CAD] rounded-lg hover:bg-blue-50 transition-all duration-200">
                View All Jobs
              </button>
            </div>

            {/* Simulation Recommendations */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Target className="w-5 h-5 text-[#000CAD] mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Simulation Recommendations</h2>
              </div>
              
              <div className="space-y-3">
                {dashboardData.simulationRecommendations.map((sim) => (
                  <div key={sim.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                       onClick={() => navigate(`/simulation/${sim.id}`)}>
                    <img 
                      src={sim.thumbnail} 
                      alt={sim.title}
                      className="w-12 h-12 rounded-lg object-cover mr-3"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{sim.title}</h4>
                      <p className="text-xs text-gray-500">{sim.duration} • {sim.level}</p>
                    </div>
                    <Play className="w-4 h-4 text-[#000CAD]" />
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => navigate('/library')}
                className="w-full mt-4 px-4 py-2 text-sm text-[#000CAD] border border-[#000CAD] rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                View All Simulations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;