import React, { useState } from 'react';
import { useFitnessApp } from '../../../context/FitnessAppContext';
import FormField from '../../ui/FormField';
import Button from '../../ui/Button';
import { FileText } from 'lucide-react';

const HealthLimitationsStep: React.FC = () => {
  const { userData, updateUserData, nextStep, prevStep } = useFitnessApp();
  
  const [errors, setErrors] = useState({
    limitations: '',
    medicalDocument: '',
  });

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    // Validate file type (PDF only)
    if (file && file.type !== 'application/pdf') {
      setErrors(prev => ({ ...prev, medicalDocument: 'Only PDF files are allowed' }));
      return;
    }
    
    // Validate file size (max 5MB)
    if (file && file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, medicalDocument: 'File size should be less than 5MB' }));
      return;
    }
    
    updateUserData({ medicalDocument: file });
    setErrors(prev => ({ ...prev, medicalDocument: '' }));
  };

  // Move to next step
  const handleNextStep = () => {
    nextStep();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Health Status</h3>
      
      <FormField 
        label="Do you have any physical limitations or health conditions?" 
        name="limitations"
        error={errors.limitations}
      >
        <textarea
          id="limitations"
          value={userData.limitations}
          onChange={(e) => updateUserData({ limitations: e.target.value })}
          className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 min-h-[100px] border transition-colors duration-200"
          placeholder="Describe any injuries, health conditions, or physical limitations that might affect your workout program (e.g., back pain, knee injury, asthma, etc.)"
        />
      </FormField>
      
      <FormField 
        label="Upload medical documents (optional)" 
        name="medicalDocument"
        error={errors.medicalDocument}
      >
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-gray-300 dark:border-gray-600">
          <div className="space-y-1 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600 dark:text-gray-300">
              <label
                htmlFor="medicalDocument"
                className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
              >
                <span>Upload a file</span>
                <input
                  id="medicalDocument"
                  name="medicalDocument"
                  type="file"
                  className="sr-only"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PDF up to 5MB
            </p>
            {userData.medicalDocument && (
              <p className="text-sm text-green-500">
                File selected: {userData.medicalDocument.name}
              </p>
            )}
          </div>
        </div>
      </FormField>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4 text-sm text-blue-700 dark:text-blue-300">
        <p>
          <span className="font-bold">Privacy Note:</span> Any medical information you provide is kept confidential and will only be used to customize your fitness plan. Documents are securely stored and will not be shared with third parties.
        </p>
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

export default HealthLimitationsStep;