import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useFitnessApp } from './context/FitnessAppContext';
import Header from './components/layout/Header';
import OnboardingForm from './components/forms/OnboardingForm';
import ResultsPage from './pages/ResultsPage';
import LandingPage from './pages/LandingPage';
import AIAgentsDashboard from './pages/AIAgentsDashboard';
import Footer from './components/layout/Footer';

const Router: React.FC = () => {
  const { formSubmitted } = useFitnessApp();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/register" 
            element={formSubmitted ? <Navigate to="/results" /> : <OnboardingForm />} 
          />
          <Route 
            path="/results" 
            element={formSubmitted ? <ResultsPage /> : <Navigate to="/register" />} 
          />
          <Route path="/ai-agents" element={<AIAgentsDashboard />} />
          <Route path="/login" element={<div>Login page coming soon...</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default Router;