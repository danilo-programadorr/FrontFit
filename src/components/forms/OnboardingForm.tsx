import React from 'react';
import { useFitnessApp } from '../../context/FitnessAppContext';
import ProgressBar from '../ui/ProgressBar';
import PersonalInfoStep from './steps/PersonalInfoStep';
import FitnessGoalsStep from './steps/FitnessGoalsStep';
import HealthLimitationsStep from './steps/HealthLimitationsStep';
import DietaryPreferencesStep from './steps/DietaryPreferencesStep';
import ReviewStep from './steps/ReviewStep';

const OnboardingForm: React.FC = () => {
  const { userData } = useFitnessApp();
  const { step } = userData;

  // Render the appropriate step
  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfoStep />;
      case 2:
        return <FitnessGoalsStep />;
      case 3:
        return <HealthLimitationsStep />;
      case 4:
        return <DietaryPreferencesStep />;
      case 5:
        return <ReviewStep />;
      default:
        return <PersonalInfoStep />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">
          Create Your Personalized Fitness Plan
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Complete the form to get a customized workout and nutrition plan
        </p>
      </div>
      
      <ProgressBar 
        totalSteps={5} 
        currentStep={step} 
        stepLabels={['Personal Info', 'Fitness Goals', 'Health Status', 'Diet', 'Review']} 
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6 transition-all duration-300">
        {renderStep()}
      </div>
    </div>
  );
};

export default OnboardingForm;