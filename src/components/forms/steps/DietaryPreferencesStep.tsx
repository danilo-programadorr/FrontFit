import React, { useState } from 'react';
import { useFitnessApp } from '../../../context/FitnessAppContext';
import FormField from '../../ui/FormField';
import Button from '../../ui/Button';
import { Apple, Leaf, Pizza } from 'lucide-react';

const DietaryPreferencesStep: React.FC = () => {
  const { userData, updateUserData, nextStep, prevStep } = useFitnessApp();
  
  const [errors, setErrors] = useState({
    dietPreference: '',
  });

  // Validate and move to next step
  const handleNextStep = () => {
    const newErrors = {
      dietPreference: !userData.dietPreference ? 'Please select a dietary preference' : '',
    };

    setErrors(newErrors);

    // Check if any validation errors exist
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    nextStep();
  };

  // Dietary preference option component
  const DietOption = ({ value, icon: Icon, label, description }: {
    value: 'low-carb' | 'vegan' | 'traditional',
    icon: React.ElementType,
    label: string,
    description: string
  }) => (
    <label
      className={`block p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
        userData.dietPreference === value
          ? 'bg-green-50 border-green-500 dark:bg-green-900/20 dark:border-green-400'
          : 'bg-white border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600'
      }`}
    >
      <input
        type="radio"
        name="dietPreference"
        value={value}
        checked={userData.dietPreference === value}
        onChange={() => updateUserData({ dietPreference: value })}
        className="sr-only"
      />
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${
          userData.dietPreference === value
            ? 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300'
            : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
        }`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <span className={`block font-medium ${
            userData.dietPreference === value
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
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Dietary Preferences</h3>
      
      <FormField
        label="What type of diet do you prefer?"
        name="dietPreference"
        required
        error={errors.dietPreference}
      >
        <div className="space-y-3">
          <DietOption
            value="low-carb"
            icon={Apple}
            label="Low Carb"
            description="Reduced carbohydrate intake, higher in protein and healthy fats"
          />
          
          <DietOption
            value="vegan"
            icon={Leaf}
            label="Plant-Based / Vegan"
            description="Exclusively plant foods, no animal products"
          />
          
          <DietOption
            value="traditional"
            icon={Pizza}
            label="Traditional Balanced"
            description="Balanced mix of carbs, proteins and fats with no specific restrictions"
          />
        </div>
      </FormField>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 text-sm text-yellow-700 dark:text-yellow-300 mt-6">
        <p className="font-bold mb-1">Important:</p>
        <p>Your nutrition plan will be created based on your selected preferences, goals, and body metrics. For specific medical dietary requirements, please consult with a healthcare professional.</p>
      </div>
      
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

export default DietaryPreferencesStep;