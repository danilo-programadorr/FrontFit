import React from 'react';
import { useFitnessApp } from '../../../context/FitnessAppContext';
import Button from '../../ui/Button';
import { CheckCircle2, Edit2 } from 'lucide-react';

const ReviewStep: React.FC = () => {
  const { userData, goToStep, submitForm, loading } = useFitnessApp();

  // Helper function to get label for enum values
  const getLabel = (type: string, value: string) => {
    const labels: Record<string, Record<string, string>> = {
      goal: {
        'weight-loss': 'Weight Loss',
        'muscle-gain': 'Muscle Gain',
        'maintenance': 'Maintain Current Form',
      },
      experienceLevel: {
        'beginner': 'Beginner',
        'intermediate': 'Intermediate',
        'advanced': 'Advanced',
      },
      gender: {
        'male': 'Male',
        'female': 'Female',
        'other': 'Other',
      },
      dietPreference: {
        'low-carb': 'Low Carb',
        'vegan': 'Plant-Based / Vegan',
        'traditional': 'Traditional Balanced',
      }
    };
    
    return labels[type]?.[value] || value;
  };

  // Summary section component
  const SummarySection = ({ 
    title, 
    fields, 
    step 
  }: { 
    title: string, 
    fields: Array<{label: string, value: string | number | null, type?: string}>, 
    step: number 
  }) => (
    <div className="border dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-200 mb-4">
      <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-4 border-b dark:border-gray-700">
        <h4 className="font-medium text-gray-800 dark:text-white">{title}</h4>
        <button 
          type="button"
          onClick={() => goToStep(step)}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 text-sm"
        >
          <Edit2 className="h-3.5 w-3.5" />
          <span>Edit</span>
        </button>
      </div>
      <div className="p-4 bg-white dark:bg-gray-800">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {fields.map((field, index) => (
            <div key={index} className="sm:col-span-1">
              <dt className="text-gray-500 dark:text-gray-400">{field.label}</dt>
              <dd className="font-medium text-gray-900 dark:text-white mt-1">
                {field.type ? getLabel(field.type, field.value as string) : field.value || 'Not specified'}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-2" />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Review Your Information</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Please review your details before generating your personalized fitness plan
        </p>
      </div>
      
      <SummarySection 
        title="Personal Information" 
        fields={[
          { label: 'Full Name', value: userData.fullName },
          { label: 'Gender', value: userData.gender, type: 'gender' },
          { label: 'Weight', value: userData.weight ? `${userData.weight} kg` : null },
          { label: 'Height', value: userData.height ? `${userData.height} cm` : null },
          { label: 'BMI', value: userData.bmi ? userData.bmi : null },
        ]} 
        step={1} 
      />
      
      <SummarySection 
        title="Fitness Goals" 
        fields={[
          { label: 'Primary Goal', value: userData.goal, type: 'goal' },
          { label: 'Experience Level', value: userData.experienceLevel, type: 'experienceLevel' },
        ]} 
        step={2} 
      />
      
      <SummarySection 
        title="Health Information" 
        fields={[
          { label: 'Physical Limitations', value: userData.limitations || 'None specified' },
          { label: 'Medical Document', value: userData.medicalDocument ? userData.medicalDocument.name : 'None uploaded' },
        ]} 
        step={3} 
      />
      
      <SummarySection 
        title="Dietary Preferences" 
        fields={[
          { label: 'Diet Type', value: userData.dietPreference, type: 'dietPreference' },
        ]} 
        step={4} 
      />
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4 text-sm text-blue-700 dark:text-blue-300 mt-6">
        <p>
          <span className="font-bold">Almost there!</span> By submitting this form, you'll receive a personalized fitness and nutrition plan based on your input. You can always make changes to your plan later.
        </p>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button onClick={() => goToStep(4)} variant="outline">
          Back
        </Button>
        <Button onClick={submitForm} variant="primary" loading={loading}>
          Generate My Plan
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;