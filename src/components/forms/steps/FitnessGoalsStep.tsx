import React, { useState } from 'react';
import { useFitnessApp } from '../../../context/FitnessAppContext';
import FormField from '../../ui/FormField';
import Button from '../../ui/Button';
import { TrendingDown, TrendingUp, BarChart4 } from 'lucide-react';

const FitnessGoalsStep: React.FC = () => {
  const { userData, updateUserData, nextStep, prevStep } = useFitnessApp();
  
  const [errors, setErrors] = useState({
    goal: '',
    experienceLevel: '',
  });

  // Validate and move to next step
  const handleNextStep = () => {
    const newErrors = {
      goal: !userData.goal ? 'Please select a goal' : '',
      experienceLevel: !userData.experienceLevel ? 'Please select an experience level' : '',
    };

    setErrors(newErrors);

    // Check if any validation errors exist
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    nextStep();
  };

  // Goal option component for DRY code
  const GoalOption = ({ value, icon: Icon, label, description }: { 
    value: 'weight-loss' | 'muscle-gain' | 'maintenance', 
    icon: React.ElementType, 
    label: string, 
    description: string 
  }) => (
    <label 
      className={`block p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
        userData.goal === value 
          ? 'bg-green-50 border-green-500 dark:bg-green-900/20 dark:border-green-400'
          : 'bg-white border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600'
      }`}
    >
      <input
        type="radio"
        name="goal"
        value={value}
        checked={userData.goal === value}
        onChange={() => updateUserData({ goal: value })}
        className="sr-only"
      />
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${
          userData.goal === value 
            ? 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300'
            : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
        }`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <span className={`block font-medium ${
            userData.goal === value 
              ? 'text-green-700 dark:text-green-300' 
              : 'text-gray-900 dark:text-white'
          }`}>
            {label}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </span>
        </div>
      </div>
    </label>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Fitness Goals</h3>
      
      <FormField 
        label="What is your primary fitness goal?" 
        name="goal" 
        required 
        error={errors.goal}
      >
        <div className="space-y-3">
          <GoalOption 
            value="weight-loss" 
            icon={TrendingDown} 
            label="Weight Loss" 
            description="Focus on reducing body fat while maintaining muscle mass"
          />
          
          <GoalOption 
            value="muscle-gain" 
            icon={TrendingUp} 
            label="Muscle Gain" 
            description="Build strength and increase muscle mass"
          />
          
          <GoalOption 
            value="maintenance" 
            icon={BarChart4} 
            label="Maintain Current Form" 
            description="Focus on overall fitness and maintaining current body composition"
          />
        </div>
      </FormField>
      
      <FormField 
        label="Experience Level" 
        name="experienceLevel" 
        required 
        error={errors.experienceLevel}
      >
        <div className="flex flex-wrap gap-3">
          {[
            { value: 'beginner', label: 'Beginner', description: 'New to fitness or returning after a long break' },
            { value: 'intermediate', label: 'Intermediate', description: 'Consistent training for 6+ months' },
            { value: 'advanced', label: 'Advanced', description: 'Several years of consistent training' }
          ].map((level) => (
            <label 
              key={level.value} 
              className={`flex-1 min-w-[150px] p-3 border rounded-md cursor-pointer transition-all duration-200 ${
                userData.experienceLevel === level.value 
                  ? 'bg-green-50 border-green-500 dark:bg-green-900/20 dark:border-green-400' 
                  : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
              }`}
            >
              <input
                type="radio"
                name="experienceLevel"
                value={level.value}
                checked={userData.experienceLevel === level.value}
                onChange={() => updateUserData({ experienceLevel: level.value as any })}
                className="sr-only"
              />
              <div className="text-center">
                <span className={`block font-medium ${
                  userData.experienceLevel === level.value 
                    ? 'text-green-700 dark:text-green-300' 
                    : 'text-gray-800 dark:text-white'
                }`}>
                  {level.label}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                  {level.description}
                </span>
              </div>
            </label>
          ))}
        </div>
      </FormField>
      
      <div className="flex justify-between mt-6">
        <Button onClick={prevStep} variant="outline">
          Back
        </Button>
        <Button onClick={handleNextStep} variant="primary">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default FitnessGoalsStep;