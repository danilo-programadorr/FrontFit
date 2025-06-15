import React, { useState, useEffect } from 'react';
import { useFitnessApp } from '../../../context/FitnessAppContext';
import FormField from '../../ui/FormField';
import Button from '../../ui/Button';
import { User, Scale, Ruler } from 'lucide-react';

const PersonalInfoStep: React.FC = () => {
  const { userData, updateUserData, nextStep, calculateBMI } = useFitnessApp();
  
  const [errors, setErrors] = useState({
    fullName: '',
    weight: '',
    height: '',
    gender: '',
  });

  // Validate and move to next step
  const handleNextStep = () => {
    const newErrors = {
      fullName: !userData.fullName ? 'Name is required' : '',
      weight: !userData.weight ? 'Weight is required' : '',
      height: !userData.height ? 'Height is required' : '',
      gender: !userData.gender ? 'Gender is required' : '',
    };

    setErrors(newErrors);

    // Check if any validation errors exist
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    // Calculate BMI before moving to next step
    calculateBMI();
    nextStep();
  };

  // Update BMI whenever weight or height changes
  useEffect(() => {
    if (userData.weight && userData.height) {
      calculateBMI();
    }
  }, [userData.weight, userData.height, calculateBMI]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Personal Information</h3>
      
      <FormField 
        label="Full Name" 
        name="fullName" 
        required 
        error={errors.fullName}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="fullName"
            value={userData.fullName}
            onChange={(e) => updateUserData({ fullName: e.target.value })}
            className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 border transition-colors duration-200"
            placeholder="John Doe"
          />
        </div>
      </FormField>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField 
          label="Weight (kg)" 
          name="weight" 
          required 
          error={errors.weight}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Scale className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="weight"
              value={userData.weight}
              onChange={(e) => updateUserData({ weight: e.target.value ? parseFloat(e.target.value) : '' })}
              min="30"
              max="300"
              className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 border transition-colors duration-200"
              placeholder="70"
            />
          </div>
        </FormField>
        
        <FormField 
          label="Height (cm)" 
          name="height" 
          required 
          error={errors.height}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Ruler className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="height"
              value={userData.height}
              onChange={(e) => updateUserData({ height: e.target.value ? parseFloat(e.target.value) : '' })}
              min="100"
              max="250"
              className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 border transition-colors duration-200"
              placeholder="175"
            />
          </div>
        </FormField>
      </div>
      
      {userData.bmi !== null && (
        <div className={`p-3 rounded-md ${
          userData.bmi < 18.5 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
          userData.bmi < 25 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
          userData.bmi < 30 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          <p className="font-medium">BMI: {userData.bmi}</p>
          <p className="text-sm">
            {userData.bmi < 18.5 ? 'Underweight' :
             userData.bmi < 25 ? 'Normal weight' :
             userData.bmi < 30 ? 'Overweight' : 'Obese'}
          </p>
        </div>
      )}
      
      <FormField 
        label="Gender" 
        name="gender" 
        required 
        error={errors.gender}
      >
        <div className="flex flex-wrap gap-3">
          <label className={`flex items-center p-3 border rounded-md cursor-pointer transition-all duration-200 ${
            userData.gender === 'male' 
              ? 'bg-green-50 border-green-500 dark:bg-green-900 dark:border-green-400' 
              : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600'
          }`}>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={userData.gender === 'male'}
              onChange={() => updateUserData({ gender: 'male' })}
              className="sr-only"
            />
            <span className={`${userData.gender === 'male' ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-200'}`}>
              Male
            </span>
          </label>
          
          <label className={`flex items-center p-3 border rounded-md cursor-pointer transition-all duration-200 ${
            userData.gender === 'female' 
              ? 'bg-green-50 border-green-500 dark:bg-green-900 dark:border-green-400' 
              : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600'
          }`}>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={userData.gender === 'female'}
              onChange={() => updateUserData({ gender: 'female' })}
              className="sr-only"
            />
            <span className={`${userData.gender === 'female' ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-200'}`}>
              Female
            </span>
          </label>
          
          <label className={`flex items-center p-3 border rounded-md cursor-pointer transition-all duration-200 ${
            userData.gender === 'other' 
              ? 'bg-green-50 border-green-500 dark:bg-green-900 dark:border-green-400' 
              : 'bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600'
          }`}>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={userData.gender === 'other'}
              onChange={() => updateUserData({ gender: 'other' })}
              className="sr-only"
            />
            <span className={`${userData.gender === 'other' ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-200'}`}>
              Other
            </span>
          </label>
        </div>
      </FormField>
      
      <div className="flex justify-end mt-6">
        <Button onClick={handleNextStep} variant="primary">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;