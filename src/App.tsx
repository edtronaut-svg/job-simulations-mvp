import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Personalization from './pages/Personalization';
import SimulationLibrary from './pages/SimulationLibrary';
import SimulationWorkspace from './pages/SimulationWorkspace';
import Assessment from './pages/Assessment';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 transition-all duration-300">
          <Header />
          <main className="animate-fade-in">
            <Routes>
              <Route path="/" element={<Personalization />} />
              <Route path="/library" element={<SimulationLibrary />} />
              <Route path="/simulation/:id" element={<SimulationWorkspace />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;