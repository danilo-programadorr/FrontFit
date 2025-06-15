import React from 'react';
import { useFitnessApp } from '../../context/FitnessAppContext';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
  stepLabels: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalSteps, currentStep, stepLabels }) => {
  const { goToStep } = useFitnessApp();

  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      goToStep(step);
    }
  };

  return (
    <div className="relative">
      <div className="hidden sm:flex justify-between items-center mb-6">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isClickable = stepNumber < currentStep;

          return (
            <div
              key={stepNumber}
              className={`relative flex flex-col items-center ${isClickable ? 'cursor-pointer' : ''}`}
              onClick={() => isClickable && handleStepClick(stepNumber)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                  isActive
                    ? 'bg-green-500 text-white'
                    : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs text-center ${
                  isActive || isCompleted
                    ? 'text-green-500 font-medium'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {stepLabels[index]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Line connecting steps */}
      <div className="hidden sm:block absolute top-4 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{
            width: `${((Math.max(currentStep - 1, 0)) / (totalSteps - 1)) * 100}%`,
          }}
        />
      </div>

      {/* Mobile version - just show current step / total */}
      <div className="flex sm:hidden items-center justify-between mb-4">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Step {currentStep} of {totalSteps}: {stepLabels[currentStep - 1]}
        </div>
        <div className="text-sm font-medium text-green-500">{Math.round((currentStep / totalSteps) * 100)}%</div>
      </div>
      <div className="sm:hidden w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-300 rounded-full"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;